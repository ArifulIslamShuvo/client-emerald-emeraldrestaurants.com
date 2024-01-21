import axios from "axios"
import { useSelector } from "react-redux"
import { DEFAULT_ADDRESSES_API } from "../../../../../Utilities/APIs"
import { useContext } from "react"
import AppContext from "../../../../../Context/AppContext"

function DefaultAddressConfirmation({selectedAddress, targetID, handleClose, triggerFetch}) {

    const {customer} = useSelector(state => state.auth)
    const { setIsLoading } = useContext(AppContext)


    async function makeDefaultAddress() {
      setIsLoading(true)
  
        const config = {
          headers: {
              Authorization: `Bearer ${customer.token}`
          }
        } 
  
        const response = await axios.post(DEFAULT_ADDRESSES_API + targetID, '', config)
        if (response) {
            // console.log(response)
            handleClose()
            triggerFetch()
            setIsLoading(false)
        }

    }
  
    
  
    
    return (
      <div className="address_modal">
        <h3>Make Default Address</h3>
        <div className="delete_view grid_container">
          <p className="body_text">Are you sure you want to make {selectedAddress?.name} your default address?</p>
        </div>
        <div className="grid_container">
          <button 
            type='submit' 
            className='btn_text btn_border'
            onClick={makeDefaultAddress}
          >
            Make Default Address
          </button>
          <button
            type='button'
            className='btn_text forgot_pass'
            onClick={() => {
              handleClose()
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
}

export default DefaultAddressConfirmation