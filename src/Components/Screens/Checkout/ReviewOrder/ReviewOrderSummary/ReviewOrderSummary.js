import { useState, useEffect, useContext } from 'react'
import { DELIVERY_FEES_API, DISCOUNTS_API, ITEMS_API, VATS_API } from '../../../../../Utilities/APIs'
import { takaFormatter } from '../../../../../Utilities/Formatter'
import AppContext from '../../../../../Context/AppContext'

function ReviewOrderSummary() {

    const { cartItems } = useContext(AppContext)
    const cartItemsTotalPrice = cartItems.map(item => item.total)
 
    const total = cartItemsTotalPrice.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    const [products, setProducts] = useState(null)

    // const [discount, setDiscount] = useState(0)
    // console.log("🚀 ~ file: ReviewOrderSummary.js:18 ~ ReviewOrderSummary ~ discount:", discount)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [vat, setVat] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)


    useEffect(() => {

        async function getAndSetProducts() {

            const productRes = await fetch(ITEMS_API)
            const productData = await productRes.json()
            setProducts(productData)

        }

        getAndSetProducts()

    }, [])

    useEffect(() => {

        // let cartItemsTotal = 0
        // const cartItemsJSON = Array.from(cartItems)


        // if(products && cartItemsJSON.length > 0) {
        //     const cartTotalArray = cartItemsJSON.map(i => i.quantity * products.find(p => p._id === i.item)?.price)
        //     cartItemsTotal = cartTotalArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
        //     setTotal(cartItemsTotal)
        // }

        async function getAndSetOrderAmounts() {
            // const discountRes = await fetch(DISCOUNTS_API)
            // const discountData = await discountRes.json()
            // const discountAmount = cartItemsTotal * discountData[0].amount / 100
            // setDiscount(discountAmount)
            
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

    return (
        <div className='os_wrapper'>
            <div className='grid_container'>
                <h6 className="bold_cap">Total</h6>
                <h6>{takaFormatter(total.toFixed(2))}</h6>
            </div>
            {/* <div className='grid_container'>
                <h6 className="bold_cap">Discount</h6>
                <h6>{takaFormatter(discount.toFixed(2))}</h6>
            </div> */}
            <div className='grid_container'>
                <h6 className="bold_cap">Delivery Fee</h6>
                <h6>{takaFormatter(deliveryFee.toFixed(2))}</h6>
            </div>
            <div className='grid_container'>
                <h6 className="bold_cap">Subtotal</h6>
                <h6>{takaFormatter(subtotal.toFixed(2))}</h6>
            </div>
            <div className='grid_container'>
                <h6 className="bold_cap">Vat</h6>
                <h6>{takaFormatter(vat.toFixed(2))}</h6>
            </div>
            <div className='grid_container'>
                <h6 className="bold_cap">Discount</h6>
                <h6>{takaFormatter(discount.toFixed(2))}</h6>
            </div>
            <div className='grand_total grid_container'>
                <h6 className="bold_cap">Grand Total</h6>
                <h4>{takaFormatter(grandTotal.toFixed(2))}</h4>
            </div>
        </div>
    )
}

export default ReviewOrderSummary
