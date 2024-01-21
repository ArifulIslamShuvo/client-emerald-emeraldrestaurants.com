import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CUSTOMERS_API } from "../../../../Utilities/APIs"
import AppContext from "../../../../Context/AppContext"


function ResetPassword() {

    const [newPass, setNewPass] = useState('')
    const [newPass2, setNewPass2] = useState('')

    const { token } = useParams()
    const navigate = useNavigate()

    const { setIsLoading } = useContext(AppContext)

    async function handleSubmit(e) {
        setIsLoading(true)

        e.preventDefault()

        if (newPass !== newPass2) {
            console.log('Passwords Do Not Match')
        }

        const formBody = {
            token,
            newPassword: newPass
        }

        const changePassword = await axios.patch(CUSTOMERS_API + 'resetCustomerPassword', formBody)

        if (changePassword) {
            setNewPass('')
            setNewPass2('')
            navigate('/signIn')
            setIsLoading(false)
        }


    }
    return (
        <>
            <section className="recover_pass  page_padding">
                <div className="container">
                    <div className="page_logo">
                        {/* <Logo /> */}
                    </div>
                    <div className="centered_form_wrapper">
                        <div className="form_wrapper">
                            <h3>Recover Password</h3>
                            <form action="/">
                                <div className="input_group">
                                    <label className="input_field_label caption bold">new password</label>
                                    <input
                                        type="password"
                                        className="input_field body_text"
                                        placeholder='Enter password'
                                        value={newPass}
                                        onChange={e => setNewPass(e.target.value)}
                                    />
                                </div>
                                <div className="input_group">
                                    <label className="input_field_label caption bold">confirm password</label>
                                    <input
                                        type="password"
                                        className="input_field body_text"
                                        placeholder='Enter password'
                                        value={newPass2}
                                        onChange={e => setNewPass2(e.target.value)}
                                    />
                                </div>
                                <button type='submit' className='btn_text btn_border' onClick={handleSubmit}>change password</button>
                            </form>
                            <Link to='/signIn' className='btn_text forgot_pass'>Back to Login</Link>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword