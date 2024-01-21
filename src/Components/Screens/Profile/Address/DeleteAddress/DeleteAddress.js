import axios from "axios"
import { useSelector } from "react-redux"
import { ADDRESSES_API } from "../../../../../Utilities/APIs"

function DeleteAddress({selectedAddress, targetID, handleClose, triggerFetch}) {

  const {customer} = useSelector(state => state.auth)

  async function handleDelete() {

      const config = {
        headers: {
            Authorization: `Bearer ${customer.token}`
        }
      } 

      const response = await axios.delete(ADDRESSES_API + targetID, config)
      if (response) {
        handleClose()
        triggerFetch()
      }
  }

  

  
  return (
    <div className="address_modal">
      <h3>Address view</h3>
      <div className="delete_view grid_container">
        <p className="body_text">Are you sure you want to delete {selectedAddress?.name}?</p>
      </div>
      <div className="grid_container">
        <button 
          type='submit' 
          className='btn_text btn_border'
          onClick={handleDelete}
        >
          Delete Address
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

export default DeleteAddress