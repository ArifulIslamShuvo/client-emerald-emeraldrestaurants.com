import { RiEditBoxLine } from 'react-icons/ri'
import './SelectedAddress.css'


function SelectedAddress({

    // addresses, selectedAddress,
    addresses, targetID,
    // areas, districts, divisions,
    setShowModal, setShowUpdateForm
    
}) {
    git 
    return (
      <div className="default_info delivery_address_view">
        {addresses && addresses.length > 0 && targetID && targetID !== 'initial'
        ?
        <>
          <button className="edit_btn" onClick={() => {
              setShowModal(true)
              setShowUpdateForm(true)
          }}>
              <RiEditBoxLine />
              <div className='btn_text'>edit</div>
          </button>
          <div className="grid_container">
              {/* <div className="info_content">
                  <p className='caption bold'>Division</p>
                  <p className="body_text">
                  {
                    divisions?.find(
                      divToFind => divToFind._id === districts?.find(
                          disToFind => disToFind._id === areas?.find(
                            a => a._id === (addresses?.find(add => add._id === targetID)?.area)
                          )?.district
                      )?.division
                    )?.name
                  }
                  </p>
              </div>
              <div className="info_content">
                  <p className='caption bold'>District</p>
                  <p className="body_text">
                      {
                        districts?.find(
                          disToFind => disToFind._id === areas?.find(
                            a => a._id === (addresses?.find(add => add._id === targetID)?.area)
                          )?.district
                        )?.name
                      }
                  </p>
              </div> */}
              <div className="info_content">
                  <p className='info-default'>Full address</p>
                  <p className="info-text">{addresses?.find(add => add?._id === targetID)?.fullAddress}</p>
              </div>
              <div className="info_content">
                  {/* <p className='caption bold'>Area</p> */}
                  <p className='info-default'>Area</p>
                  <p className="info-text">{addresses?.find(add => add._id === targetID)?.name}</p>
              </div>
              <div className="info_content">
                  <p className='info-default'>Zip code</p>
                  <p className="info-text">{addresses?.find(add => add._id === targetID)?.zipCode}</p>
              </div>
          </div>
        </>
        :
          <p>Please add an Address</p>
        }
      </div>
    )
}

export default SelectedAddress