import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CUSTOMERS_API } from '../../../../Utilities/APIs'
import Navbar from '../../../Partials/Sections/Navbar/Navbar'

import './ForgotPassword.css'
import AppContext from '../../../../Context/AppContext'

function ForgotPassword() {
    const { setIsLoading } = useContext(AppContext)

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')

    async function handleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
        if (email.length > 0) {
            const forgotPass = await axios.post(CUSTOMERS_API + 'forgotCustomerPassword', { email })
            if (forgotPass) {
                setEmailSent(true)
                setIsLoading(false)
            }
        }
    }
    return (
        <>
            <Navbar darkBg='bg-dark' />
            <section className="recover_pass page_padding">
                <div className="container">
                    <div className="page_logo">
                        {/* <Logo /> */}
                    </div>
                    {
                        emailSent
                            ?
                            <div className="centered_form_wrapper">
                                <div className="form_wrapper">
                                    <h3>Recover Password</h3>
                                    <div className="input_group" style={{ marginBottom: '1rem' }}>
                                        <p className="body_text">
                                            An email has been sent to {email}.
                                        </p>
                                    </div>
                                    <div className="dha_box" style={{ marginTop: '0' }}>
                                        <p className="body_text">Didn’t receive any mail yet?</p>
                                        <button type='submit' className='btn_text sign_up'>resend email</button>
                                    </div>
                                    <Link to='/login' className='btn_text forgot_pass'>Back to Login</Link>
                                </div>
                            </div>
                            :
                            <div className="centered_form_wrapper">
                                <div className="form_wrapper">
                                    <h3>Recover Password</h3>
                                    <form action="/">
                                        <div className="input_group">
                                            <label className="input_field_label caption bold">Email</label>
                                            <input
                                                type="email"
                                                className="input_field"
                                                placeholder='Enter Email'
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                            <p className="status" style={{ marginTop: '.8rem' }}>We’ll email you a link that will let you change your password</p>
                                        </div>
                                        <button type='submit' className='btn_text btn_border' onClick={handleSubmit}>
                                            send recovery email
                                        </button>
                                    </form>
                                    <Link to='/signIn' className='btn_text forgot_pass'>Back to Login</Link>

                                    {/* <div className="dha_box">
                        <Link to='/login' className='btn_text sign_up'>Back to Login</Link>
                    </div> */}
                                </div>
                            </div>
                    }
                </div>
            </section>
        </>
    )
}

export default ForgotPassword