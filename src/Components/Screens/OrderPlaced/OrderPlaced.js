import { Link } from 'react-router-dom'
import banner from '../../../Components/Assets/images/image 16.png'
import Trouvaille from '../../../Components/Assets/restaurant-logos/Trouvaille.svg'
import Navbar from '../../Partials/Sections/Navbar/Navbar'

import './OrderPlaced.css'

function OrderPlaced() {
    return (
        <>
            <Navbar darkBg='bg-dark' />

            <div>
                <div class="page-banner">
                    <img src={banner} alt="" className='banner-img' />
                </div>
                <section className="checkout">
                    <div class="container">
                        <div class="checkout-contents">
                            <div class="order-details">
                                <div class="orderPlaced">
                                    <div class="order-info">
                                        <div class="order-detail">
                                            <h1 className='order-placed'>order placed!</h1>
                                            <h6 className='ordering'>Thank you for ordering from Emerald Restaurants! </h6>

                                            <p>Upon receiving your order, one of our representatives will personally <b>call you at
                                                01827654092</b> to confirm your order.</p>
                                            <div className='view-order-btn'>
                                                <Link to="/allOrder">View My Orders</Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="cart-content">
                                <div class="rigthCart">
                                    <div class="cart-detailss">
                                        <div class="my-order">
                                            <h1 class="checkoutCart-title">My Order</h1>
                                        </div>
                                        <div class="trouvaille-logo">
                                            <img src={Trouvaille} alt="" />
                                        </div>
                                    </div>

                                    <div class="cart-detailss">
                                        <div class="checkout-cart-info">
                                            <ul class="checkoutCartItem">

                                                <li>
                                                    <div>
                                                        <span class="itmQuantity">1X</span>
                                                    </div>
                                                    <div className='product-name'>
                                                        <span class="itemName">Cream of Mushroom</span>
                                                    </div>
                                                    <div>
                                                        <span class="itemPrice">Tk. 1200</span>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div>
                                                        <span class="itmQuantity">1X</span>
                                                    </div>
                                                    <div className='product-name'>
                                                        <span class="itemName">Seafood Soup with Coconut Milk</span>
                                                    </div>
                                                    <div>
                                                        <span class="itemPrice">Tk. 700</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="total">
                                            <ul class="allItemPriceBox">

                                                <li>
                                                    <div class="firstColumn">
                                                        Grand Total
                                                    </div>
                                                    <div class="secondColumn">
                                                        Tk. 2130
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default OrderPlaced