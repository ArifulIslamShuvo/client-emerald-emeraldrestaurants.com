import React from 'react'
import './HomeContact.css'
function HomeContact() {
  return (
    <div className='home-contact'>
        <div className='home-contact-item'>
            <div className='contact-left-content'>
                <h2>Feel Free to Give Your Valuable Feedback!</h2>
            </div>
            <div className='contact-right-content'>
                <form>
                    <input className='input-field' type='text' placeholder='Enter Your Email'/>
                    <textarea className='input-field' type='text' placeholder='Enter Your Email'/>
                    <button className='home-contact-btn'>
                        <span>SEND</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default HomeContact