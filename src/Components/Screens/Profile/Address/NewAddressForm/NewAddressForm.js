import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"

import { ADDRESSES_API, EMERALD_AREAS_API } from '../../../../../Utilities/APIs'

import './NewAddressForm.css'
import AppContext from '../../../../../Context/AppContext'

function NewAddressForm({

    triggerFetch, handleClose,
    

}) {

    const { setIsLoading } = useContext(AppContext)

    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [area, setArea] = useState('')
    const [precedence, setPrecedence] = useState('')
    const [fullAddress, setFullAddress] = useState('')
    const [zipCode, setZipCode] = useState('')

    const { customer } = useSelector(state => state.auth)
  
    const [emaraldAreas, setEmaraldAreas] = useState(null);

    useEffect(() => {
        async function getEmaraldAreas() {
            setIsLoading(true)
            const { data } = await axios.get(EMERALD_AREAS_API);
            setEmaraldAreas(data);
            setIsLoading(false)
        }
        getEmaraldAreas()
    }, [setIsLoading])

    async function handleSubmit(e) {
        setIsLoading(true)

        e.preventDefault()

        const addressData = {
            type,
            name,
            area,
            precedence,
            fullAddress,
            zipCode,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${customer.token}`
            }
        }

        const response = await axios.post(ADDRESSES_API, addressData, config)
        

        if (response) {

            setType('')
            setName('')
            setArea('')
            setPrecedence('')
            setFullAddress('')
            setZipCode('')
            handleClose()
            triggerFetch()
            setIsLoading(false)
        }

    }

    return (
        <div className="new_address_form">
            <form onSubmit={handleSubmit}>
                <div className="grid_container">

                    <div className="input-field">
                        <select
                            className='input_field'
                            value={type}
                            onChange={e => setType(e.target.value)}
                            required
                        >
                            <option value='' hidden>Select Address Type</option>
                            <option value='home'>Home </option>
                            <option value='office'>Office</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>

                    <div className="">
                        <input
                            type="text"
                            className="input_field"
                            placeholder='Enter a name for your address'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_group">
                        <select
                            className='input_field'
                            value={area}
                            onChange={e => setArea(e.target.value)}
                            required
                        >
                            <option value='' hidden>Select Area</option>
                            {emaraldAreas?.map(emaraldArea => (
                                <option
                                    key={emaraldArea._id}
                                    value={emaraldArea._id}
                                >
                                    {emaraldArea.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="input_group">
                        <select
                            className='input_field'
                            value={precedence}
                            onChange={e => setPrecedence(e.target.value)}
                            required
                        >

                            <option value='' hidden>Select Precedence</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={5}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>

                        </select>
                    </div>

                    <div className="input_group full_width">
                        <textarea
                            className='input_field'
                            placeholder='Enter Full Address'
                            rows="2"
                            value={fullAddress}
                            onChange={e => setFullAddress(e.target.value)}
                            required
                        >
                        </textarea>
                    </div>

                    <div className="input_group">
                        <input
                            type="text"
                            className="input_field"
                            placeholder='zip code'
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                            required
                        />
                    </div>

                </div>
                <div className="btn_wrapper align_center">
                    <button type='submit' className='btn_submit'>Save New Address</button>
                </div>
            </form>
        </div>
    )
}

export default NewAddressForm