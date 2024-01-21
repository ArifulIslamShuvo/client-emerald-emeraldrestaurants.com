import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../../../Context/AppContext'
import PrimaryButton from '../../../Partials/Elements/Buttons/PrimaryButton/PrimaryButton'
import ConfImg from '../../../Assets/images/confirmation-tick.svg'

import './Confirmation.css'

function Confirmation() {

    const { myOrders } = useContext(AppContext)
    const navigate = useNavigate()


    return (
        <section className='confirmation_page checkout_page'>
            <div className="confirmation_content">
                <div className="image_wrapper">
                    <img src={ConfImg} alt="done" />
                </div>
                <h3>Your order has been confirmed. <br /> Please wait for our representatives to call.</h3>
                <p className="thank">Thank you for ordering from <span style={{ color: '#070707' }}>{myOrders?.restaurant.name}</span></p>
                <h5 className="order_code">order ID: <span style={{ color: '#000000' }}>{myOrders?.orderID}</span></h5>
                <PrimaryButton
                    type='button'
                    btnText='VIEW YOUR ORDER'
                    handleClick={() => navigate('/allOrder')}
                />
                {/* <Link to='/my-profile/my-orders' className='btn_text'>View your order</Link> */}
            </div>
        </section>
    )
}

export default Confirmation