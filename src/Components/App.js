import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css';

import AboutUs from './Screens/AboutUs/AboutUs';
import Home from './Screens/Home/Home';
import Footer from './Partials/Sections/Footer/Footer';
import SignIn from './Screens/SignIn/SignIn';
import Menu from './Screens/Menu/Menu';
import NotFound from './Screens/NotFound/NotFound';
import Contact from './Screens/ContactUs/Contact';
import AllOrder from './Screens/AllOrder/AllOrder';
import OrderPlaced from './Screens/OrderPlaced/OrderPlaced';
import Profile from './Screens/Profile/Profile';
import ProfileInfo from './Screens/Profile/ProfileInfo/ProfileInfo';
import Address from './Screens/Profile/Address/Address';
import PrivacyPolicy from './Screens/PrivacyPolicy/PrivacyPolicy';
import Checkout from './Screens/Checkout/Checkout';
import Confirmation from './Screens/Checkout/OrderConfirmation/Confirmation';
import Order from './Screens/Order/Order';
import AddNumber from './Screens/AddNumber/AddNumber';
import { useDispatch, useSelector } from 'react-redux';
import ScrollTop from '../ScrollTop';
import axios from 'axios';
import { logout } from '../Redux/Features/Auth/authSlice';
import VerifyEmail from './Screens/SignIn/VerifyEmail/VerifyEmail';
import Loader from './Partials/Elements/Loader/Loader';
import { useContext } from 'react';
import AppContext from '../Context/AppContext';
import ForgotPassword from './Screens/SignIn/ForgotPassword/ForgotPassword';
import ResetPassword from './Screens/SignIn/ResetPassword/ResetPassword';

function App() {

  const { customer } = useSelector(state => state.auth)
  const { isLoading } = useContext(AppContext)

  const dispatch = useDispatch()

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        dispatch(logout())
      }
      return Promise.reject(err);
    }
  );

  return (
    <>
      <BrowserRouter>


        <>
          <ScrollTop />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signIn' element={<SignIn />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/recover-pass-one" element={<ForgotPassword />} />
            <Route path="/resetForgottenPassword/:token" element={<ResetPassword />} />

            <Route path='/addNumber' element={<AddNumber />} />
            <Route path='/menu/:Id' element={<Menu />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/checkout/*' element={customer ? <Checkout /> : <Navigate to='/signIn' />} />
            <Route path='/confirmation' element={<Confirmation />} />

            <Route path='/orderPlaced' element={<OrderPlaced />} />
            <Route path='/allOrder' element={<AllOrder />} />
            <Route path='/profile' element={<Profile />}>
              <Route path='myProfile' element={<ProfileInfo />} />
              <Route path='address' element={<Address />} />
            </Route>
            <Route path='/notFound' element={<NotFound />} />

            <Route path='/privacy-policy' element={<PrivacyPolicy />} />

            {/* <Route path='/myProfile' element={<MyProfile />} /> */}
          </Routes>
          <Order />
          <Footer />
        </>
        {
          isLoading && <Loader />
        }


      </BrowserRouter>
      {/* {isLoading &&
        <Loader />
      } */}
    </>
  );
}

export default App;
