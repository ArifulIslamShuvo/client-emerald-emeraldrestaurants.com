import { NavLink, Outlet } from 'react-router-dom'
import ImgMan from '../../../Assets/images/profile/image 20.png'
import Navbar from '../../Partials/Sections/Navbar/Navbar'


import './Profile.css'

function Profile() {
    return (
        <>
            <Navbar darkBg='bg-dark' />
            <section>
                <div className="profile_grid">
                    <div className="profile_grid_item">
                        <div className="profile">
                            <div className="profile_tabs">
                                <NavLink to='/profile/myProfile'>Your profile</NavLink>
                                <NavLink to='/profile/address'>Address</NavLink>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                    <div className="profile_grid_item">
                        <img className="w-100 left-img" src={ImgMan} alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile