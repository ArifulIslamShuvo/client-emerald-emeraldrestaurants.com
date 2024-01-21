import { useContext } from 'react'

import InvertedButton from '../../../Partials/Elements/Buttons/InvertedButton/InvertedButton'
import PrimaryButton from '../../../Partials/Elements/Buttons/PrimaryButton/PrimaryButton'
import OrderItem from './OrderItem/OrderItem'
import ReviewOrderSummary from './ReviewOrderSummary/ReviewOrderSummary'

import './ReviewOrder.css'
import AppContext from '../../../../Context/AppContext'

function ReviewOrder({ fullAddressString, setCheckoutStep, confirmOrder }) {

    const { cartItems} = useContext(AppContext)

    return (
        <section className='review_order_page'>
            <div className="grid_container">
                <div className="review_order_content">


                    
                    <div className="order_lists_title grid_container">
                        <div className="">
                            <p className="caption bold">ITEM</p>
                        </div>
                        <div className=""></div>
                        <div className="">
                            <p className="caption bold">QTY</p>
                        </div>
                        <div className="">
                            <p className="caption bold">unit PRICE</p>
                        </div>
                        <div className="">
                            <p className="caption bold">total</p>
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="order_lists ">
                        {
                            cartItems?.map(i => (
                                <OrderItem
                                    key={i.item + i.size}
                                    // imgSrc={
                                    //     IMAGE_URL +
                                    //     products.find(it => it._id === i.item)?.image.slice(
                                    //         6, products.find(it => it._id === i.item)?.image
                                    //     )
                                    // }
                                    // imgAlt={products.find(it => it._id === i.item)?.name}
                                    itemName={i.name}
                                    quantity={i.quantity}
                                    itemPrice={i.price}
                                    total = {i.total}
                                    itemID={i.item}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* delivery address view and order summery */}
                <div className="dav_os_wrapper">
                    <div className='dav_wrapper form_wrapper'>
                        <h4>Delivery Address</h4>
                        <div className="body_text">{fullAddressString}</div>
                    </div>
                    <ReviewOrderSummary />

                    {/* group button / link */}
                    <div className="btn_group_wrapper grid_container">
                        <InvertedButton
                            type='button'
                            btnText='CHANGE ADDRESS'
                            handleClick={() => setCheckoutStep(1)}
                        />
                        <PrimaryButton
                            type='button'
                            btnText='CONFIRM ORDER'
                            handleClick={confirmOrder}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReviewOrder