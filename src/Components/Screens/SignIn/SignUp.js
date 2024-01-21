
import google from '../../../Assets/images/sign up/Google.svg'
// import facebook from '../../../Assets/images/sign up/facebook.svg'
import { LoginSocialGoogle } from 'reactjs-social-login';
import { useDispatch, useSelector } from 'react-redux';
import { register, registerWithGoogle, reset } from '../../../Redux/Features/Auth/authSlice';
import { useEffect, useState } from 'react';
import { GOOGLE_CLIENT_APP_ID } from '../../../Constants';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const { isLoading, customer, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    }
    // useEffect(() => {
    //     if (!customer.mobile) {
    //         navigate('/addNumber')
    //     }
    // }, [customer, navigate])

    // useEffect(() => {
    //     if (customer.mobile) {
    //         navigate('/')
    //     }
    // }, [customer, navigate])

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        if (isSuccess && customer && !customer.isVerified) {
            navigate('/verify-email')
        }
        dispatch(reset())
    })


    async function handleSubmit(e) {

        e.preventDefault();

        if (password !== password2) {
            console.log('Passwords do not match!')

        } else {

            const customerData = {};
            
            customerData.name = name;
            customerData.email = email;
            customerData.mobile = mobile;
            customerData.password = password;
            
            console.log("🚀 ~ file: SignUp.js:63 ~ handleSubmit ~ customerData:", customerData)

            // const response = await axios.post(CUSTOMERS_API + 'register/', customerData)
            dispatch(register(customerData))
            navigate('/verify-email/default')


            // if (response) {
            //     setName('')
            //     setEmail('')
            //     setMobile('')
            //     setPassword('')
            //     setPassword2('')
            //     navigate('/verify-email')
            // }
        }

    }


    if (isLoading) {
        return <h1>Loading...</h1>
    }
    //facebook

    // async function handleFacebookRegister(response) {
    //     try {
    //         const userData = {
    //             name: `${response.data.first_name}${response.data.last_name ? response.data.last_name : ''}`,
    //             fbId: response.data.userID
    //         }

    //         dispatch(registerWithFacebook(userData));

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    //google
    async function handleGoogleRegister(response) {
        try {
            const userData = {
                name: response.data.name,
                googleId: response.data.sub
            }

            dispatch(registerWithGoogle(userData));

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <p>Sign up instantly with your Google or Facebook account.</p>
            <p>{message}</p>
            <div className="social-login">

                <LoginSocialGoogle
                    client_id={GOOGLE_CLIENT_APP_ID}
                    onResolve={response => {
                        handleGoogleRegister(response)
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
                        handleFacebookRegister(response)
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
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        onChange={e => setMobile(e.target.value)}
                    />
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <span onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
                    </div>
                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            onChange={e => setPassword2(e.target.value)}
                        />
                        <span onClick={handleShowConfirmPassword}>{showConfirmPassword ? 'Hide' : 'Show'}</span>
                    </div>
                    <button type="submit">sign up</button>
                </div>
            </form>
        </>
    )
}

export default SignUp