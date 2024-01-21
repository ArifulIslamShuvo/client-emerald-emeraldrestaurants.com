import React from 'react'
import facebook from '../../../Components/Assets/images/menu/facebook.svg'
import instragram from '../../../Components/Assets/images/menu/instragram.svg'
import trouvaille from '../../../Components/Assets/logo/Trouvaille.svg'
import './Trouvalle.css'
import { Link } from 'react-router-dom'
function Trouvalle() {
    return (

        <div className="container-fluid restaurent-Details">
            <div className="row">
                <div className="social_logo social-link">
                    <Link to=""><img src={facebook} alt="" /></Link>
                    <Link to="/"><img src={instragram} alt="" /></Link>
                </div>
                <div className="trouvaille_logo">
                    <img className="restaLogo" src={trouvaille} alt="" />
                </div>
                <div className="restaurSubTitle">
                    <p> Delivery available only in Gulshan</p>
                </div>
                <div className="restaurDetails">
                    <p>Remember all the times we spared no effort in searching for something and we only found it when we
                        stopped looking? Well, that’s the beauty of life. We chance upon certain things when we least expect
                        them. It’s like walking towards the unknown only to find surprises. There’s an underlying
                        satisfaction to it, it keeps us humble</p>

                </div>
            </div>
        </div>

    )
}

export default Trouvalle