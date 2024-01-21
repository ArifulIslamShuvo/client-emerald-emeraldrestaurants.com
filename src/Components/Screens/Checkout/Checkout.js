import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
// import { Route, Routes } from 'react-router-dom'

// import { ITEMS_API, DISCOUNTS_API, DELIVERY_FEES_API, VAT_API, ORDERS_API } from '../../../Utilities/APIs'
import CheckoutStepper from './CheckoutStepper/CheckoutStepper'
import AddressSelection from './AddressSelection/AddressSelection'
import ReviewOrder from './ReviewOrder/ReviewOrder'
import Confirmation from './OrderConfirmation/Confirmation'

import { useSelector } from 'react-redux'
import './Checkout.css'
import { Helmet } from 'react-helmet'
import { DELIVERY_FEES_API,  DISCOUNTS_API,  ITEMS_API, ORDERS_API, VATS_API } from '../../../Utilities/APIs'
import Navbar from '../../Partials/Sections/Navbar/Navbar'
import AppContext from '../../../Context/AppContext'

function Checkout() {

    const [checkoutStep, setCheckoutStep] = useState(1)

    const { customer } = useSelector(state => state.auth)

    const { cartItems , setCartItems, triggerFetchRequest, setIsLoading } = useContext(AppContext)
    // const cartItemsTotalPrice = cartItems.map(item => item.total)
    // const totolPrice = cartItemsTotalPrice.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
   const restaurant = cartItems[0]?.restaurant
    const [targetID, setTargetID] = useState('initial')
    const [fullAddressString, setFullAddressString] = useState('')
    const [area, setArea] = useState('')
    const [areaString, setAreaString] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [products, setProducts] = useState(null)
    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [vat, setVat] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)

    const [orderID, setOrderID] = useState('')


    useEffect(() => {

        async function getAndSetProducts() {

            const productRes = await fetch(ITEMS_API)
            const productData = await productRes.json()
            setProducts(productData)

        }

        getAndSetProducts()

    }, [])

    useEffect(() => {

        let cartItemsTotal
        const cartItemsJSON = Array.from(cartItems)


        if (products && cartItemsJSON.length > 0) {
            const cartTotalArray = cartItemsJSON.map(i => i.quantity * products.find(p => p._id === i.item)?.price)
            cartItemsTotal = cartTotalArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
            setTotal(cartItemsTotal)
        }

        async function getAndSetOrderAmounts() {
            
            
            const deliveryFeeRes = await fetch(DELIVERY_FEES_API)
            const deliveryFeeData = await deliveryFeeRes.json()
            const deliveryFeeAmount = total === 0 ? 0 : deliveryFeeData[0].amount
            setDeliveryFee(deliveryFeeAmount)

            const subTotalAmount = total + deliveryFeeAmount
            setSubtotal(subTotalAmount)

            const vatRes = await fetch(VATS_API)
            const vatData = await vatRes.json()
            const vatAmount = subTotalAmount * vatData[0].amount / 100
            setVat(vatAmount)

            const discountRes = await fetch(DISCOUNTS_API);
            const discountData = await discountRes.json();
            const discountAmount = (subTotalAmount + vatAmount) * discountData[0].amount / 100
            setDiscount(discountAmount)

            const grandTotalAmount = subTotalAmount + vatAmount - discountAmount
            setGrandTotal(grandTotalAmount)

        }

        getAndSetOrderAmounts()

    }, [cartItems, products, total])

    async function confirmOrder() {
       setIsLoading(true)

        const orderItems = cartItems.map(i => {
            return i = {
                ...i,
                unitPrice: products.find(p => p._id === i.item).price,
                total: products.find(p => p._id === i.item).price * i.quantity
            }
        })

        const itemData = {
            address: targetID,
            fullAddressString,
            area,
            areaString,
            zipCode,
            total,
            deliveryFee,
            discount,
            subtotal,
            vat,
            grandTotal,
            // notes,
            orderItems,
            restaurant
        }

        const config = {
            headers: {
                Authorization: `Bearer ${customer.token}`
            }
        }

        const response = await axios.post(ORDERS_API + 'customerCreatesOrder', itemData, config)

        if (response) {
            setOrderID(response.data.order._id)
            // dispatch(reset())
            setCheckoutStep(3)
            setCartItems([])
            triggerFetchRequest()
            setIsLoading(false)
        }

    }

    return (
        <>
            <Navbar darkBg='bg-dark' />
            <section className='checkout_page'>
                <Helmet>
                    <title>Checkout | Emerald Restaurant</title>
                </Helmet>
                <div className="container">
                    {/* <h2>Checkout</h2> */}
                    <CheckoutStepper checkoutStep={checkoutStep} />
                    {
                        checkoutStep === 1 &&
                        <AddressSelection
                            setCheckoutStep={setCheckoutStep}

                            targetID={targetID}
                            setTargetID={setTargetID}

                            setFullAddressString={setFullAddressString}
                            setArea={setArea}
                            setAreaString={setAreaString}
                            // setDistrict={setDistrict}
                            // setDivision={setDivision}
                            setZipCode={setZipCode}
                        />
                    }
                    {
                        checkoutStep === 2 &&
                        <ReviewOrder
                            fullAddressString={fullAddressString}
                            setCheckoutStep={setCheckoutStep}
                            confirmOrder={confirmOrder}
                        />
                    }
                    {
                        checkoutStep === 3 &&
                        <Confirmation
                            orderID={orderID}
                        />
                    }
                </div>
            </section>
        </>

    )
}

export default Checkout