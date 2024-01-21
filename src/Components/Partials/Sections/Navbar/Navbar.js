/* eslint-disable no-const-assign */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import ImgLogo from '../../../../Assets/images/main-logo.svg'
import CartIcon from '../../../../Assets/images/Home/cart.svg'
import Modal from '../../Layouts/Modal/Modal';
import SelectLocationForm from '../../Layouts/SelectLocationForm/SelectLocationForm';
import Cart from '../Cart/Cart';

import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import AppContext from '../../../../Context/AppContext';
import { logout, reset } from '../../../../Redux/Features/Auth/authSlice';

function Navbar({ darkBg }) {

    // const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const { customer } = useSelector((state) => state.auth)
    const { selectedArea, cartItems } = useContext(AppContext)

    const [showModal, setShowModal] = useState(false);
    const [showSLForm, setShowSLForm] = useState(false);
    const [showNavDd, setShowNavDd] = useState(false);
    const [showCollapseMenu, setShowCollapseMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const navddToggle = () => {
        setShowNavDd(prevState => !prevState)
    }

    const collapseToggle = () => {
        setShowCollapseMenu(prevState => !prevState)
    }

    const cartToggle = () => {
        setShowCart(prevState => !prevState)
    }


    const handleClose = () => {
        setShowModal(false);
        setShowSLForm(false);
    };

    // function handleToggle() {
    //     setShowAccountDropdown(prev => !prev);
    // }

    const dispatch = useDispatch()

    function handleLogout() {
        console.log('yo')
        dispatch(logout());
        dispatch(reset());
        // handleToggle();
    }
    // .vertical {
    //     width: 2px;
    //     height: 60px;
    //     background-color: #FFFF;
    //     margin: 0 auto;
    //   }

    return (
        <>
            <nav className={`navbar navbar-expand-lg sticky-top ${darkBg}`}>
                <div className="container-fluid nav-container">
                    <div className="navbar-brand-wrapper">
                        <button className="navbar-toggler" type="button" onClick={collapseToggle}>
                            <div className="bar-wrapper">
                                <div className="line line-one"></div>
                                <div className="line line-two"></div>
                                <div className="line line-three"></div>
                            </div>
                        </button>
                        <Link className="navbar-brand d-block" to="/">
                            <img src={ImgLogo} alt="Emerald Logo" />
                        </Link>
                    </div>
                    <div className="vertical-line"></div>
                    
                    <div className="navbar-cart d-lg-none">
                        <div className="navbar-location-select-box d-lg-none">
                            <button
                                type="button"
                                className="navbar-modal-show-btn"
                                onClick={() => {
                                    setShowModal(true)
                                    setShowSLForm(true)
                                }}
                            >
                                  {selectedArea.length < 8 ? selectedArea : selectedArea.slice(0,8) + '...'}
                            </button>
                        </div>
                        <div onClick={cartToggle}>
                            <img src={CartIcon} alt="emerald cart" />
                            <div className="cart-counter">
                                <span>{cartItems?.length}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="navbar-location-select-box d-none d-lg-block">
                        <button
                            type="button"
                            className="navbar-modal-show-btn"
                            onClick={() => {
                                setShowModal(true)
                                setShowSLForm(true)
                            }}
                        >
                            {selectedArea}
                        </button>
                    </div>

                    <div className="vertical-line"></div>

                    <div className={`collapse navbar-collapse ${showCollapseMenu ? 'show' : ''}`} >
                        
                        <div className="navbar-large-device d-none d-lg-block">
                            
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    {/* <Link to='/aboutUs' className="nav-link active">About Us</Link> */}
                                    <Link to='/aboutUs' className="nav-link active">All Restaurants</Link>
                                </li>
                                
                                {!(customer && customer.isVerified) &&
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signIn">sign in</Link>
                                    </li>
                                }

                                {(customer && customer.isVerified) &&
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" role="button" onClick={navddToggle}>
                                            My Profile
                                        </Link>
                                        <ul className={`dropdown-menu ${showNavDd ? 'show' : ''}`} >
                                            <li><Link className="dropdown-item" to="/profile/myProfile">My Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/allOrder">My Orders</Link></li>
                                            <button className='logout_btn' onClick={handleLogout}>
                                                {/* <IoLogOut /> */}
                                                Log Out
                                            </button>
                                        </ul>
                                    </li>
                                }

                                <li className="nav-item">
                                    <div
                                        className="nav-link emerald-add-cart"
                                        onClick={cartToggle}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img className='add-cart' src={CartIcon} alt="emerald cart" />
                                        <div className="cart-counter">
                                            <span>{cartItems?.length}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        

                        <ul className="navbar-nav navbar-small-device d-lg-none">
                            <li className="nav-item">
                                <Link to='/aboutUs' className="nav-link active" onClick={collapseToggle}>About Us</Link>
                            </li>

                            {!(customer && customer.isVerified) &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signIn" onClick={collapseToggle}>sign in</Link>
                                </li>
                            }
                            {(customer && customer.isVerified) &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link " to="/profile/myProfile" onClick={collapseToggle}>My Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/allOrder" onClick={collapseToggle}>My Orders</Link>
                                    </li>
                                    <li className="nav-item">

                                        {/* <Link className="nav-link" to="/" onClick={collapseToggle}>sign out</Link> */}
                                    </li>
                                    <button className='mb_logout_btn' onClick={handleLogout}>
                                        {/* <IoLogOut /> */}
                                        Log Out
                                    </button>
                                </>
                            }
                        </ul>
                        {/* <div className="navbar-location-select-box d-lg-none">
                            <button
                                type="button"
                                className="navbar-modal-show-btn"
                                onClick={() => {
                                    setShowModal(true)
                                    setShowSLForm(true)
                                }}
                            >
                                Gulshan
                            </button>
                        </div> */}
                    </div>
                    
                </div>
            </nav>
            <div className={`nav-overlay ${showCollapseMenu ? 'show' : ''}`}></div>

            {/* Cart */}
            <Cart showCart={showCart} cartToggle={cartToggle} />

            {(selectedArea === 'Select Area' || showModal) &&
                <Modal
                    handleClose={handleClose}
                >
                    {(selectedArea === 'Select Area' || showSLForm)  &&
                        <SelectLocationForm handleClose={handleClose} />
                    }
                </Modal>
            }
        </>
    )
}

export default Navbar