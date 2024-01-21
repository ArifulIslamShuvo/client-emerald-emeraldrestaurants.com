import { RiEditBoxLine, RiHomeLine, RiEyeLine, RiDeleteBin6Line, RiMapPinLine, RiBuilding2Line } from 'react-icons/ri'

import './AddressBox.css'

function AddressBox({

    address, divisions, districts, areas,
    setShowModal,
    setShowViewSection, setShowUpdateForm, setShowDeleteSection, setShowDefaultAddressSection,
    setTargetID,
    defaultAddress

}) {



    return (
        <div className="grid_item">
            <div className='default_info'>
                <div className="edit_btn">
                    <div className="">
                        {address?.type === 'home' && <RiHomeLine />}
                        {address?.type === 'office' && <RiBuilding2Line />}
                        {address?.type === 'other' && <RiMapPinLine />}
                        <p className='caption ps-2'>{address?.type}</p>
                    </div>
                    <div className="">
                        <button type='button' className='btn_text' onClick={() => {
                            setShowModal(true)
                            setShowViewSection(true)
                            setTargetID(address._id)
                        }}>
                            <RiEyeLine />
                        </button>
                        <button type='button' className='btn_text' onClick={() => {
                            setShowModal(true)
                            setShowUpdateForm(true)
                            setTargetID(address._id)
                        }}>
                            <RiEditBoxLine />
                        </button>
                        <button type='button' className='btn_text' onClick={() => {
                            setShowModal(true)
                            setShowDeleteSection(true)
                            setTargetID(address._id)
                        }}>
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                </div>
                <div className="address_info grid_container">
                    <div className="info_content">
                        <p className='caption bold'>Division</p>
                        <p className="body_text">
                            {divisions?.find(
                                divToFind => divToFind._id === districts?.find(
                                    disToFind => disToFind._id === areas?.find(
                                        areaToFind => areaToFind._id === address.area
                                    ).district
                                ).division
                            ).name}
                        </p>
                    </div>
                    <div className="info_content">
                        <p className='caption bold'> District</p>
                        <p className="body_text">
                            {districts?.find(
                                disToFind => disToFind._id === areas?.find(
                                    areaToFind => areaToFind._id === address.area
                                ).district
                            ).name
                            }
                        </p>
                    </div>
                    <div className="info_content">
                        <p className='caption bold'> Area</p>
                        <p className="body_text">
                            {areas.find(areaToFind => areaToFind._id === address.area).name}
                        </p>
                    </div>
                    <div className="info_content">
                        <p className='caption bold'> Zip code</p>
                        <p className="body_text"> {address?.zipCode} </p>
                    </div>
                    <div className="info_content">
                        <p className='caption bold'> Full address</p>
                        <p className="body_text"> {address?.fullAddress}</p>
                    </div>
                </div>
            </div>
            {!defaultAddress &&
                <button
                    type='button'
                    className={`caption bold da_text`}
                    onClick={() => {
                        setShowModal(true)
                        setShowDefaultAddressSection(true)
                        setTargetID(address._id)
                    }}
                >
                    Set as Default
                </button>
            }
            {defaultAddress &&
                <button
                    type='button'
                    className={`caption bold da_text`}
                    disabled
                >
                    Default Address
                </button>
            }
        </div>
    )
}

export default AddressBox