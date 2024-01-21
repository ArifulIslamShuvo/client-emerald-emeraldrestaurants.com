import profile1 from '../../../Assets/images/profile/image 20.png';
import myProfilePhoto from '../../../Assets/images/profile/profile-img.png';
import edit from '../../../Assets/images/profile/edit.svg'
import './MyProfile.css';
function MyProfile() {
  return (
    <div className='profile-section'>
            <div className="container">
                <div className="profile-content">
                    <div className="profile-details">
                        <h1>Your Profile</h1>
                        <div className="profile-image">
                        <img src={myProfilePhoto} alt="" />
                        <label className="file-upload-label" htmlFor="fileUpload">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M9.37333 6.01333L9.98667 6.62667L3.94667 12.6667H3.33333V12.0533L9.37333 6.01333ZM11.7733 2C11.6067 2 11.4333 2.06667 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C12.1133 2.06 11.9467 2 11.7733 2ZM9.37333 4.12667L2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667Z" fill="#1A1A1A"></path>
                            </svg>
                            </label>
                        <input type="file" id="fileUpload" accept="image/" />
                        </div>
                            <div className="account-info">
                                <h2>ACCOUNT INFORMATION</h2>
                                <img src={edit} alt="" />
                            </div>

                            <div className="user-info">
                    <div className="user">
                        <h5>Name</h5>
                        <p>Fyeeza Fyruz</p>
                    </div>
                    <div className="user">
                        <h5>Email</h5>
                        <p>ffyeeza.987@gmail.com</p>
                    </div>
                    </div>

                    <div className="delivery-info account-info">
                                <h2>DELIVERY ADDRESS</h2>
                                <img src={edit} alt="" />
                            </div>
                    <div className="delivery-address">
                    <div className="user">
                        <h5>Address</h5>
                        <p>71 Monipuripara, Tejgaon, Dhaka-1215</p>
                    </div>
                    <div className="user">
                        <h5>Mobile Number</h5>
                        <p>01789378397</p>
                    </div>
                    </div>
                    </div>

                    <div className="profile-banner">
                        <img src={profile1} alt="" />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MyProfile