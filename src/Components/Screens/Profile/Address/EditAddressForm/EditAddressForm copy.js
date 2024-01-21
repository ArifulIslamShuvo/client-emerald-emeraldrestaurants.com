import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"

import { ADDRESSES_API, AREAS_API, DISTRICTS_API } from '../../../../../Utilities/APIs'


function EditAddressForm({

  targetID, selectedAddress, selectedDivision, selectedDistrict, 
  triggerFetch, handleClose,
  divisions

}) {


  const [districts, setDistricts] = useState(null)
  const [areas, setAreas] = useState(null)

  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [area, setArea] = useState('')
  const [precedence, setPrecedence] = useState('')
  const [fullAddress, setFullAddress] = useState('')
  const [zipCode, setZipCode] = useState('')

  const { customer } = useSelector(state => state.auth)

  

  useEffect(() => {

    if (division) {
        async function fetchAndSetDistricts() {
            const districtsRes = await fetch(DISTRICTS_API + 'getDistrictsFromDivision/' + division)
            const districtsData = await districtsRes.json()
            setDistricts(districtsData)
        }

        fetchAndSetDistricts()
    }

  }, [division])

  useEffect(() => {

      if (district) {
          async function fetchAndSetAreas() {
              const areasRes = await fetch(AREAS_API + 'getAreasFromDistrict/' + district)
              const areasData = await areasRes.json()
              setAreas(areasData)
          }

          fetchAndSetAreas()
      }

  }, [district])

  useEffect(() => {
    if(selectedAddress && selectedDivision && selectedDistrict) {
      setDivision(selectedDivision)
      setDistrict(selectedDistrict)
      setArea(selectedAddress.area)
      setType(selectedAddress.type)
      setName(selectedAddress.name)
      setPrecedence(selectedAddress.precedence)
      setFullAddress(selectedAddress.fullAddress)
      setZipCode(selectedAddress.zipCode)
    }
  }, [selectedAddress, selectedDivision, selectedDistrict])

  async function handleSubmit(e) {

    e.preventDefault()

    const addressData = {
        type,
        name,
        division,
        district,
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

    const response = await axios.put(ADDRESSES_API + targetID, addressData, config)

    if (response) {

        setType('')
        setName('')
        setDivision('')
        setDistrict('')
        setArea('')
        setPrecedence('')
        setFullAddress('')
        setZipCode('')

        handleClose()

        triggerFetch()
    }

  }

  return (
    <div className="address_modal form_wrapper">
        <h3>Add New Address</h3>
        <form onSubmit={handleSubmit}>
            <div className="grid_container">

                <div className="input_group">
                    <label className="input_field_label caption bold">Select Address Type</label>
                    <select
                        className='select_field'
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value='' hidden>Select Address Type</option>
                        <option value='home'>Home </option>
                        <option value='office'>Office</option>
                        <option value='other'>Other</option>
                    </select>
                </div>

                <div className="input_group">
                    <label className="input_field_label caption bold">Address name (optional)</label>
                    <input
                        type="text"
                        className="input_field body_text"
                        placeholder='Enter a name for your address'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="input_group">
                    <label className="input_field_label caption bold">Select Division</label>
                    <select
                        className='select_field'
                        onChange={e => setDivision(e.target.value)}
                        value={division}
                    >
                        <option value='' hidden>Select Division</option>
                        {divisions?.map(divToMap => (
                            <option
                                key={divToMap._id}
                                value={divToMap._id}
                            >
                                {divToMap.name}
                            </option>
                        ))}
                    </select>
                </div>

                {
                    division &&
                    <div className="input_group">
                        <label className="input_field_label caption bold">select district</label>
                        <select
                            className='select_field'
                            value={district}
                            onChange={e => setDistrict(e.target.value)}
                        >
                            <option value='' hidden>Select District</option>
                            {districts?.map(disToMap => (
                                <option
                                    key={disToMap._id}
                                    value={disToMap._id}
                                >
                                    {disToMap.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }

                {
                    district &&
                    <div className="input_group">
                        <label className="input_field_label caption bold">select area</label>
                        <select
                            className='select_field'
                            value={area}
                            onChange={e => setArea(e.target.value)}
                        >
                            <option value='' hidden>Select Area</option>
                            {areas?.map(areaToMap => (
                                <option
                                    key={areaToMap._id}
                                    value={areaToMap._id}
                                >
                                    {areaToMap.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }

                <div className="input_group">
                    <label className="input_field_label caption bold">Precedence</label>
                    <select
                        className='select_field'
                        value={precedence}
                        onChange={e => setPrecedence(e.target.value)}
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
                    <label className="input_field_label caption bold">Full Address</label>
                    <textarea
                        className='input_field'
                        placeholder='Enter Full Address'
                        rows="2"
                        value={fullAddress}
                        onChange={e => setFullAddress(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className="input_group">
                    <label className="input_field_label caption bold">zip code</label>
                    <input
                        type="text"
                        className="input_field body_text"
                        placeholder='zip code'
                        value={zipCode}
                        onChange={e => setZipCode(e.target.value)}
                    />
                </div>

               
            </div>
            <div className="grid_container">
                <button type='submit' className='btn_text btn_border'>Update Address</button>
                <button
                    type='button'
                    className='btn_text forgot_pass'
                    onClick={() => {
                        handleClose()
                        triggerFetch()
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )

}

export default EditAddressForm