import React, { useEffect, useState } from 'react'
import Navbar from '../../Partials/Sections/Navbar/Navbar'
import PrimaryButton from '../../Partials/Elements/Buttons/PrimaryButton/PrimaryButton'
import './AddNumber.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPhoneNumber } from '../../../Redux/Features/Auth/authSlice'
function AddNumber() {
    const [mobile, setMobile] = useState('')
    const navigate = useNavigate()
    const { customer } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        if ((customer?.fbId || customer?.googleId) && customer.mobile) {
            navigate('/')
        }
    }, [customer, navigate, customer?.fbId, customer?.googleId])


    async function handleAddNumber(e) {
        e.preventDefault();
        try {
            const token = customer?.token

            const userData = { mobile, token }

            dispatch(addPhoneNumber(userData));

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar darkBg='bg-dark' />
            <div className="addNumber">
                <p>Enter your mobile number to complete the registration</p>
                <form onSubmit={handleAddNumber}>
                    <div className='number'>
                        <h3>Phone Number</h3>
                        <div className='number_input'>
                            <span>(+88)</span>
                            <input
                                type="text"
                                placeholder="Enter Phone Number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <PrimaryButton
                            type='submit'
                            btnText='Confirm Registration'
                        // handleClick={confirmOrder}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNumber