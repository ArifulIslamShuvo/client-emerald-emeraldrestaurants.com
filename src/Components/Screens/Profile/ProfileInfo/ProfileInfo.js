import ImgProfile from '../../../../Assets/images/profile/profile-img.png'
import ImgEdit from '../../../../Assets/images/profile/edit.svg'

import './ProfileInfo.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileInfo() {

    const [showForm, setShowForm] = useState(false);
    // const [showInput, setShowInput] = useState(false);
    const {customer} = useSelector((state) => state.auth)

    return (
        <div className='profile_info'>
            <div className="profile-image-box">
                <div className="">
                    <img src={ImgProfile} alt="" className="profile-img" id="uplodedImg" />
                    <label className="file-upload-label" for="fileUpload">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                            fill="none">
                            <path
                                d="M9.37333 6.01333L9.98667 6.62667L3.94667 12.6667H3.33333V12.0533L9.37333 6.01333ZM11.7733 2C11.6067 2 11.4333 2.06667 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C12.1133 2.06 11.9467 2 11.7733 2ZM9.37333 4.12667L2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667Z"
                                fill="#1A1A1A" />
                        </svg>
                    </label>
                    <input type="file" id="fileUpload" accept="image/*" />
                </div>
            </div>

            <div className="personal_info_title">
                <h2>account information</h2>
                {!showForm &&
                    <button onClick={() => setShowForm(!showForm)} className="perosnalEditBtn editBtn">
                        <img src={ImgEdit} alt="" />
                    </button>
                }
            </div>
            {showForm
                ?
                <div className="personalInfoForm">
                    <div className="formInput profile-input">
                        <div className="">
                            <input className="input_field" type="text" placeholder="Your Name" />
                        </div>
                        <div className="">
                            <input className="input_field" type="text" placeholder="Your Email" />
                        </div>

                        <div className="text-end">
                            <button onclick="personalInfoSave()" className="acountInfoBtn">Save Changes</button>
                        </div>
                    </div>
                </div>
                :
                <div className="personalInfo">
                    <div className="">
                        <h5>Name</h5>
                        <p>{customer?.name}</p>
                    </div>
                    <div className="">
                        <h5>Email</h5>
                        <p>{customer?.email}</p>
                    </div>
                </div>
            }

            {/* <div className="personal_info_title delAddress">
                <h2>Delivery address</h2>
                {!showInput &&
                    <button onClick={() => setShowInput(!showInput)} className="deliveryEditBtn editBtn">
                        <img src={ImgEdit} alt="" />
                    </button>
                }
            </div> */}
            {/* {showInput
                ?
                <div className="deliveryInfoForm">
                    <div className="formInput profile-input">
                        <div className="">
                            <input className="input_field" type="text" placeholder="Your Delivery Address" />
                        </div>
                        <div className="">
                            <input className="input_field" type="text" placeholder="Your Phone Number" />
                        </div>
                        <div className="text-end">
                            <button onclick="deliveryInfoSave()" className="acountInfoBtn">Save Changes</button>
                        </div>
                    </div>
                </div>
                :
                <div className="deliveryInfo">
                    <div className="">
                        <h5>Address</h5>
                        <p>71 Monipuripara, Tejgaon, Dhaka-1215</p>
                    </div>
                    <div className="">
                        <h5>Mobile Number</h5>
                        <p>01789378397</p>
                    </div>
                </div>
            } */}
        </div>
    )
}

export default ProfileInfo