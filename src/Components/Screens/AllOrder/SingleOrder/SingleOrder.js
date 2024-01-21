import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { IMAGE_URL, ORDERS_API } from '../../../../Utilities/APIs'
import { takaFormatter } from '../../../../Utilities/Formatter'

import './SingleOrder.css'
import AppContext from '../../../../Context/AppContext'

function SingleOrder({ parentId }) {

    const { customer } = useSelector(state => state.auth)
    const [singleOrder, setSingleOrder] = useState({})
    const { setIsLoading } = useContext(AppContext)
    const [singleItem, setSingleItem] = useState({})

    useEffect(() => {
        if (customer) {

            const config = {
                headers: {
                    Authorization: `Bearer ${customer.token}`
                }
            }

            async function getAndSetSingleOrder() {
                setIsLoading(true)
                const { data } = await axios.get(ORDERS_API + 'getSingleCustomerOrders/' + parentId, config);
                setSingleOrder(data?.orders);
                setSingleItem(data?.orderItem[0])
                setIsLoading(false)
            }
            getAndSetSingleOrder()
        }


    }, [customer, parentId, setIsLoading])


    return (
        <div className='order_history_box'>
            <div className="order_header">
                <div>
                    <h5>Order Date: <span>{new Date(singleOrder && singleOrder.createdAt).toLocaleDateString()}</span></h5>
                    <h5>Order ID: <span>{singleOrder && singleOrder?.orderID}</span></h5>
                    <h5>Order Status: <span style={{
                        color: `${(singleOrder && singleOrder.orderStatus === 'processing' ? '#DF911B' : '') ||
                        (singleOrder && singleOrder.orderStatus === 'completed' ? '#1FC069' : '') ||
                        (singleOrder && singleOrder.orderStatus === 'canceled' ? '#e9590c' : '') ||
                        (singleOrder && singleOrder.orderStatus === 'toBeDelivered' ? '#c5d724' : '') ||
                        (singleOrder && singleOrder.orderStatus === 'shipped' ? '#e4a227' : '')}`
                    }}>{singleOrder && singleOrder.orderStatus}</span></h5>
                </div>
                <div>
                    <img src={singleOrder && IMAGE_URL + singleOrder.restaurant?.logo} alt="brand" />
                </div>
            </div>
            <div className="order_body">
                <div className="">
                    <div className="grid_container">
                        <div className='grid_item'>
                            <img src={singleItem && IMAGE_URL + singleItem.item?.image} alt="" />
                        </div>
                        <div className='grid_item'>
                            <h3>{singleItem && singleItem.item?.name}</h3>
                        </div>
                        <div className='grid_item'>
                            <h4>{singleItem && singleItem.quantity}</h4>
                        </div>
                        <div className='grid_item'>
                            <h4>{takaFormatter(singleItem && singleItem?.item?.price?.toFixed(2))}</h4>
                        </div>
                    </div>
                    <div className="grid_container">
                        <div className='grid_item'>
                            <img src={singleItem && IMAGE_URL + singleItem.item?.image} alt="" />
                        </div>
                        <div className='grid_item'>
                            <h3>{singleItem && singleItem.item?.name}</h3>
                        </div>
                        <div className='grid_item'>
                            <h4>{singleItem && singleItem.quantity}</h4>
                        </div>
                        <div className='grid_item'>
                            <h4>{takaFormatter(singleItem && singleItem?.item?.price?.toFixed(2))}</h4>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className='flex_container'>
                        <h6>Total</h6>
                        <h6>{takaFormatter(singleOrder && singleOrder.total?.toFixed(2))}</h6>
                    </div>
                    <div className='flex_container'>
                        <h6>Delivery Fee</h6>
                        <h6>{takaFormatter(singleOrder && singleOrder.deliveryFee?.toFixed(2))}</h6>
                    </div>
                    <div className='flex_container'>
                        <h6>Sub Total</h6>
                        <h6>{takaFormatter(singleOrder && singleOrder.subtotal?.toFixed(2))}</h6>
                    </div>
                    <div className='flex_container'>
                        <h6>VAT</h6>
                        <h6>{takaFormatter(singleOrder && singleOrder.vat?.toFixed(2))}</h6>
                    </div>
                    <div className='flex_container'>
                        <h6>Discount</h6>
                        <h6>{takaFormatter(singleOrder && singleOrder.discount?.toFixed(2))}</h6>
                    </div>
                    <div className='flex_container grand_total'>
                        <h6>Grand Total</h6>
                        <h6>{takaFormatter(singleOrder && singleOrder.grandTotal?.toFixed(2))}</h6>
                    </div>
                </div>
            </div>
            <div className="order_note">
                <h6>Notes</h6>
                <p>No notes were written</p>
            </div>
        </div>
    )
}

export default SingleOrder