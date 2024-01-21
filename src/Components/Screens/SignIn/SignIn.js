import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle, reset } from "../../../Redux/Features/Auth/authSlice";
import signInBanner from '../../../Assets/images/sign up/image 19.png';
import signLogo from '../../../Assets/images/Logos/Emerald Group.svg';
import google from '../../../Assets/images/sign up/Google.svg'
// import facebook from '../../../Assets/images/sign up/facebook.svg'
import Navbar from "../../Partials/Sections/Navbar/Navbar";

import "./SignIn.css";
import SignUp from "./SignUp";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GOOGLE_CLIENT_APP_ID } from "../../../Constants";

function SignIn() {


  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, customer, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if ((customer?.fbId || customer?.googleId) && !customer.mobile) {
      navigate('/addNumber')
    }
  }, [customer, navigate])

  useEffect(() => {
    if ((customer?.fbId || customer?.googleId) && customer.mobile) {
      navigate('/')
    }
  }, [customer, navigate])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (isSuccess && customer && !(customer?.fbId || customer?.googleId)) {
      customer.isVerified ? navigate('/') : navigate('/verify-email/default')
    }

    dispatch(reset())
  }, [customer, isError, isSuccess, message, navigate, dispatch])

  function handleSubmit(e) {

    e.preventDefault()

    const customerData = {
      email,
      password
    }

    dispatch(login(customerData))

  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  // async function handleFacebookLogin(response) {
  //   try {
  //     const userData = {
  //       name: `${response.data.first_name}${response.data.last_name ? response.data.last_name : ''}`,
  //       fbId: response.data.userID
  //     }

  //     dispatch(loginWithFacebook(userData));

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // google
  async function handleGoogleLogin(response) {
    try {
      const userData = {
        name: response.data.name,
        googleId: response.data.sub
      }

      dispatch(loginWithGoogle(userData));

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar darkBg='bg-dark' />
      <section className="sign-in-section">
        <div className="sign-in-content">
          <div className="sign-in-banner">
            <img src={signInBanner} alt="" />
          </div>
          <div className="sign_in_container">
            <div className="tabs-menu">
              <div className="login-logo">
                <img src={signLogo} alt="" />
              </div>
              <div className="sign-in-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Sign in
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  sign up
                </button>
              </div>

              <div className="content-tabs">
                <div
                  className={toggleState === 1 ? "content  active-content" : "content"}
                >
                  <p>Sign in instantly with your Google or Facebook account.</p>
                  <div className="social-login">
                    <LoginSocialGoogle
                      client_id={GOOGLE_CLIENT_APP_ID}
                      onResolve={response => {
                        handleGoogleLogin(response)
                      }}
                      onReject={error => {
                        console.log(error);
                      }}
                    >
                      <button><img src={google} alt="" /></button>
                    </LoginSocialGoogle>

                    {/* <LoginSocialFacebook
                      appId={FB_APP_ID}
                      onResolve={response => {
                        handleFacebookLogin(response)
                      }}
                      onReject={error => {
                        console.log(error);
                      }}

                    >
                      <button><img src={facebook} alt="" /></button>

                    </LoginSocialFacebook> */}

                  </div>
                  <h6>OR</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="input-field">
                      <input
                        type="email"
                        placeholder="Your Email"
                        onChange={e => setEmail(e.target.value)}
                      />
                      <div className="password-field">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                        />
                        <span onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
                      </div>
                      <Link to='/recover-pass-one'>
                        <h2 className="forgot_password">Forgot Password</h2>
                      </Link>
                      <button type="submit">sign in</button>
                    </div>
                  </form>
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"} >
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;