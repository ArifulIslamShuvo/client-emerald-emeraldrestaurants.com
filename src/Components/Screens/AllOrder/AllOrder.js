import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RiEyeLine } from 'react-icons/ri'
import { ORDERS_API } from '../../../Utilities/APIs'
import { takaFormatter } from '../../../Utilities/Formatter'
import Navbar from '../../Partials/Sections/Navbar/Navbar'
import order from '../../../Components/Assets/images/image 19.png'

import './AllOrder.css'
import Modal from '../../Partials/Layouts/Modal/Modal'
import SingleOrder from './SingleOrder/SingleOrder'
import AppContext from '../../../Context/AppContext'


function AllOrder() {

    const { customer } = useSelector(state => state.auth)
    const [myOrders, setMyOrders] = useState(null)
    // console.log("🚀 ~ file: AllOrder.js:19 ~ AllOrder ~ myOrders:", myOrders)
    const [showSingleOrder, setShowSingleOrder] = useState(false)
    const [singleOrderId, setSingleOrderId] = useState('')
    const { setIsLoading } = useContext(AppContext)

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

    const handleClose = () => {
        setShowSingleOrder(false);
    };


    return (
        <>
            <Navbar darkBg='bg-dark' />

            <div className="order">
                <div className="order-details">
                    <div className="allOrder">
                        <h1 className="orderTitle">My orders</h1>

                        <div className="table-responsive">
                            <table className="table align-middle allOrderTable">
                                <thead>
                                    <tr>
                                        {/* <th>ORDER ID</th> */}
                                        <th>Restaurant</th>
                                        <th>PRICE</th>
                                        <th>DATE</th>
                                        <th>Status</th>
                                        <th>View Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myOrders?.reverse().map(order =>
                                            <tr key={order._id}>
                                                {/* <td>
                                                    <button data-bs-toggle="modal" data-bs-target="#orderViewModal">#{order._id}</button>
                                                </td> */}
                                                <td>{order.restaurant.name}</td>
                                                <td>{takaFormatter(order.grandTotal.toFixed(2))}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    {/* <span className="deliveryStatus pendingStatus">{order.orderStatus}</span> */}
                                                    <span
                                                        className={`deliveryStatus 
                                                        ${order.orderStatus === "processing" ? 'pendingStatus' : '' ||
                                                                order.orderStatus === "completed" ? 'deliverStatus' : '' ||
                                                                    order.orderStatus === "canceled" ? 'cancelStatus' : '' ||
                                                                        order.orderStatus === "toBeDelivered" ? 'deliveredStatus' : '' ||
                                                                            order.orderStatus === "shipped" ? 'shippedStatus' : ''
                                                            }`}
                                                    >{order.orderStatus}</span>
                                                </td>
                                                <td>
                                                    <button onClick={() => {
                                                        setShowSingleOrder(true)
                                                        setSingleOrderId(order._id)
                                                    }}><RiEyeLine /></button>
                                                </td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="order-img">
                    <img className="w-100 left-img" src={order} alt="" />
                </div>
            </div>

            {showSingleOrder &&
                <Modal
                    handleClose={handleClose}
                    extraClass="large"
                >
                    <SingleOrder
                        parentId={singleOrderId}
                    />
                </Modal>
            }
        </>
    )
}

export default AllOrder