import { useState } from 'react'
import banner from '../../../Components/Assets/images/image 16.png'
import Trouvaille from '../../../Components/Assets/restaurant-logos/Trouvaille.svg'
import edit from '../../../Components/Assets/icons/edit.svg'
import Navbar from '../Navbar/Navbar'

import './Checkout.css'
import { Link } from 'react-router-dom'

function Checkout() {
    const [showForm, setShowForm] = useState(false);
    const [showInput, setShowInput] = useState(false);

    return (
        <>
            <Navbar darkBg='bg-dark' />

            <div>
                <div class="page-banner">
                    <img src={banner} alt="" className='banner-img' />
                </div>
                <div className="checkout">
                    <div class="container">
                        <div class="checkout-contents">
                            <div class="details">
                                <div class="info-box">
                                    <div class="address-info">
                                        <div class="">
                                            <h1>Delivery address</h1>
                                            <span>**Delivery available only inside Dhaka</span>
                                        </div>
                                        {
                                            !showForm && <div class="text-end">
                                                <button onClick={() => setShowForm(!showForm)} class="editBtnDeliveryInfo editBtn">
                                                    <img src={edit} alt="" />
                                                </button>
                                            </div>
                                        }
                                    </div>

                                    {
                                        showForm ? <div class="deliveryInfoInput">
                                            <div class="formInput">
                                                <div class="">
                                                    <input class="input_field" type="text" placeholder="Address" />
                                                </div>
                                                <div class="">
                                                    <input class="input_field" type="text" placeholder="Mobile Number" />
                                                </div>

                                                <div class="">
                                                    <div class="custom-check">
                                                        <input class="check_field" type="checkbox" id="newAddres1" />
                                                        <label class="check_field_label" for="newAddress1">
                                                            Save this as my delivery address for future
                                                            reference
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="text-end">
                                                    <button class="deliveryInfoBtn">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                            :
                                            <div class='deliveryInfo'>
                                                <div class="">
                                                    <h5>Address</h5>
                                                    <p>71 Monipuripara, Tejgaon, Dhaka-1215</p>
                                                </div>
                                                <div class="">
                                                    <h5>Mobile Number</h5>
                                                    <p>01789378397</p>
                                                </div>
                                            </div>
                                    }

                                </div>
                                <div class="info-box">
                                    <div class="address-info">
                                        <div class="">
                                            <h1 className='account-title'>account information</h1>
                                        </div>
                                        {
                                            !showInput && <div class="text-end">
                                                <button onClick={() => setShowInput(!showInput)} class="editBtnDeliveryInfo editBtn">
                                                    <img src={edit} alt="" />
                                                </button>
                                            </div>
                                        }
                                    </div>


                                    {showInput ? <div class="acountInfoInput">
                                        <div class="formInput">
                                            <div class="">
                                                <input class="input_field" type="text" placeholder="Your Name" />
                                            </div>
                                            <div class="">
                                                <input class="input_field" type="text" placeholder="Your Email" />
                                            </div>


                                            <div class="">
                                                <div class="custom-check">
                                                    <input class="check_field" type="checkbox" id="newAddress" />
                                                    <label class="check_field_label" for="newAddress">
                                                        Save this as my delivery address for future
                                                        reference
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="text-end">
                                                <button class="acountInfoBtn">Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                        :
                                        <div class="acountInfo">
                                            <div class="">
                                                <h5>Name</h5>
                                                <p>Fyeeza Fyruz</p>
                                            </div>
                                            <div class="">
                                                <h5>Email</h5>
                                                <p>ffyeeza.987@gmail.com</p>
                                            </div>
                                        </div>
                                    }


                                </div>
                                <div class="paymentOption">
                                    <div class="options">
                                        <h1>Payment Options</h1>
                                        <p>Dear patrons, please be informed at the moment we only accept <b>Cash on delivery.</b>
                                        </p>
                                    </div>
                                </div>

                                <div class="place-btn">
                                    <Link to="/orderPlaced"><button class="brand-btn rounded-pill">Place Order</button></Link>
                                </div>
                            </div>

                            <div class="cart-infomation">
                                <div class="rigthCart">
                                    <div class="title-logo align-items-center">
                                        <h1 class="checkoutCart-title">My Cart</h1>
                                        <div class="trouvaille-logo">
                                            <img src={Trouvaille} alt="" />
                                        </div>
                                    </div>

                                    <div class="">
                                        <ul class="checkoutCartItem">
                                            <li>
                                                <div>
                                                    <span class="itmQuantity">1X</span>
                                                </div>
                                                <div>
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
                                                <div>
                                                    <span class="itemName">Seafood Soup with Coconut Milk</span>
                                                </div>
                                                <div>
                                                    <span class="itemPrice">Tk. 700</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="">
                                        <ul class="allItemPriceBox">
                                            <li>
                                                <div class="firstColumn">
                                                    Sub Total
                                                </div>
                                                <div class="secondColumn">
                                                    Tk. 1895
                                                </div>
                                            </li>
                                            <li>
                                                <div class="firstColumn">
                                                    VAT
                                                </div>
                                                <div class="secondColumn">
                                                    Tk. 85
                                                </div>
                                            </li>
                                            <li>
                                                <div class="firstColumn">
                                                    Delivery Fee
                                                </div>
                                                <div class="secondColumn">
                                                    Tk. 60
                                                </div>
                                            </li>
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

                                    <div class="">
                                        <span class="specialLimit">**Max 100 character</span>
                                        <textarea class="input_field specInstruction" name="instruction" cols="30" rows="6" placeholder="Special Instructions"></textarea>
                                    </div>

                                    <div class="place-btn">
                                        <Link to="/orderPlaced"><button class="brand-btn rounded-pill">Place Order</button></Link>
                                    </div>
                                    <div class="place-btn">
                                        <p class="checkoutNote">One of our representatives will personally call you to confirm your
                                            order upon checkout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Checkout