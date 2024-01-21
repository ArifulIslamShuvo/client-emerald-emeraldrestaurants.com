import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CUSTOMERS_API } from '../../../../Utilities/APIs'
// import Logo from '../../Partials/Elements/Logo/Logo'
import Navbar from '../../../Partials/Sections/Navbar/Navbar'

import './VerifyEmail.css'
import AppContext from '../../../../Context/AppContext'

function VerifyEmail() {

    const { customer } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const { token } = useParams()
    const { setIsLoading } = useContext(AppContext)


    useEffect(() => {
        if (token && token !== 'default') {
            async function verifyCustomer() {
                setIsLoading(true)

                const verification = await axios.patch(CUSTOMERS_API + 'verify/' + token)
                if (verification.data.isVerified === true) {
                    navigate('/signIn')
                    setIsLoading(false)
                }
            }
            verifyCustomer()
        }
    }, [token, navigate, setIsLoading])

    return (
        <>
            <Navbar darkBg='bg-dark' />
            <section className="recover_pass two page_padding">
                <div className="container">
                    <div className="page_logo">
                        {/* <Logo /> */}

                    </div>
                    <div className="centered_form_wrapper">
                        <div className="form_wrapper">
                            <h3>Verify your email</h3>
                            <div className="input_group">
                                <p className="body_text">
                                    A verification mail has been sent to <span style={{ color: 'var(--black)' }}>{customer?.email}.</span> Please check your email.
                                </p>
                            </div>
                            <div className="dha_box">
                                <p className="body_text">Didn’t receive a mail?</p>
                                <button type='submit' className='btn_text sign_up'>resend email</button>
                            </div>
                            <div className="dha_box">
                                <p className="body_text">Already verified?</p>
                                <Link to='/signIn' className='btn_text sign_up'>Sign In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VerifyEmail