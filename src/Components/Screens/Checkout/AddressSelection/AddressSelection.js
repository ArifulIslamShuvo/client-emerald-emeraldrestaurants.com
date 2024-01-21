import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

// import { ADDRESSES_API, AREAS_API, DEFAULT_ADDRESSES_API, DISTRICTS_API, DIVISIONS_API } from '../../../../Utilities/APIs'

import DefocusedButton from '../../../Partials/Elements/Buttons/DefocusedButton/DefocusedButton'
import PrimaryButton from '../../../Partials/Elements/Buttons/PrimaryButton/PrimaryButton'
import InvertedButton from '../../../Partials/Elements/Buttons/InvertedButton/InvertedButton'

import SelectedAddress from './SelectedAddress/SelectedAddress'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import PaymentInfo from './PaymentInfo/PaymentInfo'
import { ADDRESSES_API, DEFAULT_ADDRESSES_API} from '../../../../Utilities/APIs'
import Modal from '../../../Partials/Layouts/Modal/Modal'
import NewAddressForm from '../../Profile/Address/NewAddressForm/NewAddressForm'
import EditAddressForm from '../../Profile/Address/EditAddressForm/EditAddressForm'
import AppContext from '../../../../Context/AppContext'


function AddressSelection({

    setCheckoutStep,
    targetID, setTargetID,
    setFullAddressString, setArea, setAreaString, setZipCode

}) {

    const [addresses, setAddresses] = useState(null)
    const [toggleFetch, setToggleFetch] = useState(false)

    // const [targetID, setTargetID] = useState('initial')

    const [showModal, setShowModal] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)


    const [selectedAddress, setSelectedAddress] = useState(null)
    console.log("🚀 ~ file: AddressSelection.js:41 ~ selectedAddress:", selectedAddress)
  

    const { customer } = useSelector(state => state.auth)

    // const { cartItems } = useSelector(state => state.cart)
    const { cartItems , setIsLoading} = useContext(AppContext)

    const cartItemsQuantityArray = cartItems.map(item => item.quantity)
  
    const cartItemsQuantity = cartItemsQuantityArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)



    const navigate = useNavigate()

    // useEffects
    useEffect(() => {
      if(cartItemsQuantity === 0){
        navigate('/');
      }
    }, [cartItemsQuantity, navigate])

        
    useEffect(() => {
        if (customer) {
            
            async function fetchAndSetAddresses() {
                setIsLoading(true)
                const config = {
                    headers: {
                        Authorization: `Bearer ${customer.token}`
                    }
                }
    
                const { data } = await axios.get(ADDRESSES_API + 'getMyAddresses', config)
    
                setAddresses(data)
                setIsLoading(false)
            }
    
            fetchAndSetAddresses()
        }



    }, [toggleFetch, customer, setIsLoading])

    useEffect(() => {

        if (targetID === 'initial' && customer) {

            async function fetchAndSetDefaultAddress() {
                setIsLoading(true)
                const config = {
                    headers: {
                        Authorization: `Bearer ${customer.token}`
                    }
                }
                const { data } = await axios.get(DEFAULT_ADDRESSES_API, config)

                if (data) {
                    setTargetID(data.address)
                }
                setIsLoading(false)
            }

            fetchAndSetDefaultAddress()
        }

    }, [setTargetID, targetID, toggleFetch, customer, setIsLoading])

    useEffect(() => {
        if (addresses ) {
            const selAddress = addresses?.find(add => add._id === targetID)
            setSelectedAddress(selAddress)
           
        }
    }, [targetID, addresses])

    useEffect(() => {
        if (addresses && addresses.length > 0 && targetID && targetID !== 'initial') {
            setFullAddressString(addresses?.find(add => add._id === targetID)?.fullAddress)
            // console.log(addresses?.find(add => add._id === targetID)?.area)
            setArea(addresses?.find(add => add._id === targetID)?.area?._id)
            setAreaString((addresses?.find(add => add._id === targetID)?.area)?.name)
            setZipCode(addresses?.find(add => add._id === targetID)?.zipCode)
        }
    }, [
        targetID,
        addresses,  setFullAddressString, setArea, setAreaString, setZipCode,
    ])



    // function calls
    function triggerFetch() {
        setToggleFetch(prevState => !prevState)
    }

    function handleClose() {
        setShowModal(false)
        setShowCreateForm(false)
        setShowUpdateForm(false)
    }

    return (
        <>
            <section className='address_selected_page'>
                <div className="address_selected_content">
                    <div className="form_wrapper grid_container">
                        <div className="grid_item">
                            <PersonalInfo customer={customer} />
                            <PaymentInfo />
                        </div>

                        <div className="grid_item">
                            <h4>Delivery Address</h4>
                            <div className="selected_delivery_address grid_container">
                                <div className="input_group">
                                    <label className="input_field_label caption bold">Select from Saved Addresses</label>
                                    {addresses && addresses.length > 0
                                        ?

                                        <select
                                            className='select_field'
                                            type="text"
                                            value={targetID}
                                            onChange={e => setTargetID(e.target.value)}
                                        >
                                            <option value='initial' hidden>Select Saved Address</option>
                                            {addresses.map(add => (
                                                <option
                                                    value={add._id}
                                                    key={add._id}
                                                >
                                                    {add.name}
                                                </option>
                                            ))}
                                        </select>
                                        :
                                        <p>No saved addresses found</p>
                                    }
                                </div>
                                <div className="input_group">
                                    <InvertedButton
                                        type='button'
                                        btnText='Add New Address'
                                        handleClick={() => {
                                            setShowModal(true)
                                            setShowCreateForm(true)
                                        }}
                                    />
                                    {/* <button 
                                    type='submit' 
                                    className='btn_text btn_border head_less'
                                    onClick={() => {
                                        setShowModal(true)
                                        setShowCreateForm(true)
                                    }}
                                >
                                    add new address
                                </button> */}
                                </div>
                            </div>

                            <SelectedAddress
                                addresses={addresses}
                                targetID={targetID}
                               
                                setShowModal={setShowModal}
                                setShowUpdateForm={setShowUpdateForm}
                                setTargetID={setTargetID}
                            />

                            <div className="btn_group_wrapper grid_container">
                                <DefocusedButton
                                    type='button'
                                    btnText='Continue Shopping'
                                    handleClick={() => navigate('/')}
                                />

                                <PrimaryButton
                                    type='button'
                                    
                                    btnText={selectedAddress  ?  'Review Order' : 'Select Address'}
                                    handleClick={() => {
                                        selectedAddress   ?
                                        setCheckoutStep(2) :
                                        setCheckoutStep(1)
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {
                showModal &&

                <Modal handleClose={handleClose}>
                    {
                        showCreateForm &&
                        <NewAddressForm
                            handleClose={handleClose}
                            triggerFetch={triggerFetch}
                        />
                    }
                    {
                        showUpdateForm &&
                        <EditAddressForm
                            selectedAddress={selectedAddress}
                            targetID={targetID}
                            handleClose={handleClose}
                            triggerFetch={triggerFetch}
                            
                        />
                    }
                </Modal>

            }
        </>
    )
}

export default AddressSelection