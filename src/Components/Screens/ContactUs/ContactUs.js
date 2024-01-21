import location from '../../../Components/Assets/icons/location-mark.svg'
import phone from '../../../Components/Assets/icons/land-phone.png'
// import email from '../../../Components/Assets/icons/email.png'

import './ContactUs.css'
import { IMAGE_URL } from '../../../Utilities/APIs'

function ContactUS({restaurant}) {
  return (
    <div class="contact-us-container">
      <div class="contact-info-wrapper">
        <img src={IMAGE_URL + restaurant.logo} alt="restaurant-logo" class="restaurant-logo" />
        <div class="inner-content">
          <h5 className='logo-title'>{restaurant.name}</h5>
          <div className="list_item_wrapper">
            <div className='list_item'>
              <div className="icon">
                <img class="img-fluid" src={location} alt="location" />
              </div>
              <p class="address">{restaurant.address}</p>
            </div>
            <div className="list_item">
              <div className="icon">
                <img class="img-fluid" src={phone} alt="land-phone" />
              </div>
              <p>+88{restaurant.phone}</p>
            </div>
            {/* <div className="list_item">
              <div className="icon">
                <img class="img-fluid" src={email} alt="mail-box" />
              </div>
              <p>{restaurant.email}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUS;