import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import AppContext from '../../../Context/AppContext'
import { ORDERS_API } from '../../../Utilities/APIs'

import './Order.css'


function Order() {

    const [myOrders, setMyOrders] = useState(null)
    // const lastOrder = myOrders?.slice(-1)[0]
    const { orderStatus, setIsLoading } = useContext(AppContext)

    const { customer } = useSelector(state => state.auth)


    useEffect(() => {
        if (customer) {

            const config = {
                headers: {
                    Authorization: `Bearer ${customer.token}`
                }
            }

            async function getAndSetMyOrders() {
                setIsLoading(true)
                const { data } = await axios.get(ORDERS_API + 'getMyOrders', config);
                setMyOrders(data);
                setIsLoading(false)
            }
            getAndSetMyOrders()
        }


    }, [customer, setIsLoading])


    return (
        <>
            {customer && myOrders?.length > 0 && (orderStatus === "processing" || orderStatus === "toBeDelivered" || orderStatus === "shipped")  &&
                <div className="pending_order">
                    <div className="home_container">
                        <div className="pending_order_content">
                            <div className='po_left_middle'>
                                <div className="po_left">
                                    <p>The Restaurant is &nbsp;
                                        <span style={{ color: '#d9e021' }}>{myOrders && (
                                            (orderStatus === "processing" && 'Processing ') ||
                                            (orderStatus === "toBeDelivered" && 'Cooking ') ||
                                            (orderStatus === "shipped" && 'Delivering')
                                        )}</span>&nbsp;
                                        your Order</p>
                                </div>
                                <div className="po_middle">
                                    <div className={`${myOrders && (
                                        orderStatus === "processing" ||
                                            orderStatus === "toBeDelivered" ||
                                            orderStatus === "shipped" ? 'active' : '')}`}
                                    >
                                    </div>
                                    <div className={`${myOrders && (
                                        orderStatus === "toBeDelivered" ||
                                            orderStatus === "shipped" ? 'active' : '')}`}
                                    >
                                    </div>
                                    <div className={`${myOrders && (
                                        orderStatus === "shipped" ? 'active' : '')}`}
                                    >
                                    </div>
                                    <div></div>


                                </div>
                            </div>
                            <div className="po_right">
                                <Link to='/allOrder'>
                                    <button className='po_btn'>View Order</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Order