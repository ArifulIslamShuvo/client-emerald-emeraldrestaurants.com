import { RiEditBoxLine, RiEyeLine, RiDeleteBin6Line} from 'react-icons/ri'

import './AddressBox.css'

function AddressBox({
    address,
    setTargetID,
    setShowModal,
    setShowViewSection,
    setShowUpdateForm,
    setShowDeleteSection,
    setShowDefaultAddressSection
}) {

    return (
        <div className="grid_item">
            <div className='default_info'>
                <div className="edit_btn">
                    <div className="">
                        <p className=''>{address?.type}</p>
                    </div>
                    <div className="">
                        <button type='button' onClick={() => {
                            setShowModal(true)
                            setShowViewSection(true)
                            setTargetID(address?._id)
                            
                        }}>
                            <RiEyeLine />
                        </button>
                        <button type='button' onClick={() => {
                            setShowModal(true)
                            setShowUpdateForm(true)
                            setTargetID(address?._id)
                        }}>
                            <RiEditBoxLine />
                        </button>
                        <button type='button' onClick={() => {
                            setShowModal(true)
                            setShowDeleteSection(true)
                        }}>
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                </div>
                <div className="address_info grid_container">
                    {/* <div className="info_content">
                        <p>Division</p>
                        <p>
                            dhaka
                        </p>
                    </div>
                    <div className="info_content">
                        <p> District</p>
                        <p>
                            Dhaka
                        </p>
                    </div> */}
                    <div className="info_content">
                        <p> Area</p>
                        <p>
                            {address?.area?.name}
                        </p>
                    </div>
                    <div className="info_content">
                        <p> Zip code</p>
                        <p>{address?.zipCode} </p>
                    </div>
                    <div className="info_content">
                        <p> Full address</p>
                        <p>{address?.fullAddress}</p>
                    </div>
                </div>
            </div>
            <button
                type='button'
                className={`caption bold da_text`}
                onClick={() => {
                    setShowModal(true)
                    setShowDefaultAddressSection(true)
                }}
            >
                Set as Default
            </button>
        </div>
    )
}

export default AddressBox