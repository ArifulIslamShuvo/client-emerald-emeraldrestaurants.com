import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BsFillPlusCircleFill } from 'react-icons/bs'

import AddressBox from './AddressBox/AddressBox';
import NewAddressForm from './NewAddressForm/NewAddressForm';
import { ADDRESSES_API, DEFAULT_ADDRESSES_API } from '../../../../Utilities/APIs';

import Modal from '../../../Partials/Layouts/Modal/Modal';
import ViewAddress from './ViewAddress/ViewAddress';
import EditAddressForm from './EditAddressForm/EditAddressForm';
import DeleteAddress from './DeleteAddress/DeleteAddress';
import DefaultAddressConfirmation from './DefaultAddressConfirmation/DefaultAddressConfirmation';

import './Address.css'
import AppContext from '../../../../Context/AppContext';

export default function Address() {

    const [addresses, setAddresses] = useState(null)
    const [defaultAddress, setDefaultAddress] = useState(null)
    const [otherAddresses, setOtherAddresses] = useState(null)
    const [toggleFetch, setToggleFetch] = useState(false)

    const [targetID, setTargetID] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showViewSection, setShowViewSection] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showDeleteSection, setShowDeleteSection] = useState(false)
    const [showDefaultAddressSection, setShowDefaultAddressSection] = useState(false)

    // const [divisions, setDivisions] = useState(null)
    // const [districts, setDistricts] = useState(null)
    // const [areas, setAreas] = useState(null)

    const [selectedAddress, setSelectedAddress] = useState(null)
    const { setIsLoading } = useContext(AppContext)
   

    const { customer } = useSelector(state => state.auth)

    useEffect(() => {

        async function fetchAndSetAddresses() {
            setIsLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${customer.token}`
                }
            }

            const { data } = await axios.get(ADDRESSES_API + 'getMyAddresses', config)
            const defaultRes = await axios.get(DEFAULT_ADDRESSES_API, config)
            const defaultData = defaultRes.data
            const defaultAdd = data.find(add => add._id === defaultData.address)
            const otherAdd = data.filter(add => add._id !== defaultData.address)

            setAddresses(data)
            setDefaultAddress(defaultAdd)
            setOtherAddresses(otherAdd)
            setIsLoading(false)

        }

        fetchAndSetAddresses()




    }, [toggleFetch, customer.token, setIsLoading])

    useEffect(() => {

        const selAddress = addresses?.find(add => add._id === targetID)
        setSelectedAddress(selAddress)


    }, [targetID, addresses])

    function triggerFetch() {
        setToggleFetch(prevState => !prevState)
    }

    function handleClose() {
        setShowModal(false)
        setShowCreateForm(false)
        setShowViewSection(false)
        setShowUpdateForm(false)
        setShowDeleteSection(false)
        setShowDefaultAddressSection(false)
    }

    return (
        <>
            <div className="my_address_row grid_container">
                {defaultAddress &&
                    <AddressBox
                        address={defaultAddress}

                        setShowModal={setShowModal}

                        setShowViewSection={setShowViewSection}
                        setShowUpdateForm={setShowUpdateForm}
                        setShowDeleteSection={setShowDeleteSection}
                        setShowDefaultAddressSection={setShowDefaultAddressSection}

                        setTargetID={setTargetID}

                    />
                }
                {/* <AddressBox
                setShowModal={setShowModal}

                setShowViewSection={setShowViewSection}
                setShowUpdateForm={setShowUpdateForm}
                setShowDeleteSection={setShowDeleteSection}
                setShowDefaultAddressSection={setShowDefaultAddressSection}

                /> */}

                {otherAddresses?.map(address => (
                    <AddressBox
                        key={address._id}
                        address={address}

                        setShowModal={setShowModal}

                        setShowViewSection={setShowViewSection}
                        setShowUpdateForm={setShowUpdateForm}
                        setShowDeleteSection={setShowDeleteSection}
                        setShowDefaultAddressSection={setShowDefaultAddressSection}

                        setTargetID={setTargetID}
                    />
                ))}

                <div className="gird_item">
                    <div className="address_add">
                        <button
                            type='button'
                            onClick={() => {
                                setShowModal(true)
                                setShowCreateForm(true)
                            }}
                        >
                            <BsFillPlusCircleFill />
                            <p className='btn_text'>add new address</p>
                        </button>
                    </div>
                </div>
            </div>

            {
                showModal &&

                <Modal
                    handleClose={handleClose}
                    modalHeading={
                        (showCreateForm && 'Add New Address') ||
                        (showViewSection && 'View Address') ||
                        (showUpdateForm && 'Edit Address') ||
                        (showDeleteSection && 'Delete Address')
                    }
                >
                    {showCreateForm &&
                        <NewAddressForm
                            handleClose={handleClose}
                            triggerFetch={triggerFetch}


                        />
                    }
                    {
                        showViewSection &&
                        <ViewAddress
                            handleClose={handleClose}
                            selectedAddress={selectedAddress}


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
                    {
                        showDeleteSection &&
                        <DeleteAddress
                            selectedAddress={selectedAddress}
                            targetID={targetID}
                            handleClose={handleClose}
                            triggerFetch={triggerFetch}
                        />
                    }
                    {
                        showDefaultAddressSection &&
                        <DefaultAddressConfirmation
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
