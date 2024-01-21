import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IMAGE_URL, RESTAURANT_AREAS_API, SOCIAL_LINKS_API } from '../../../../../Utilities/APIs'
import facebook from '../../../../Assets/icons/facebook.svg'
import instragram from '../../../../Assets/icons/instragram.svg'

import './RestaurantDetails.css'
import AppContext from '../../../../../Context/AppContext'

function RestaurantDetails({ restaurant }) {

    const [fbLink, setFbLink] = useState(null);
    const [fbVisibility, setFbVisibility] = useState(null);
    const [instaLink, setInstaLink] = useState(null);
    const [instaVisibility, setInstaVisibility] = useState(null);
    const [restaurantArea, setRestaurantArea] = useState(null);
    const { setIsLoading } = useContext(AppContext);

    useEffect(() => {
        if (restaurant) {
            async function fetchAndSetSocialLinks() {
                setIsLoading(true)
                const { data } = await axios.get(SOCIAL_LINKS_API + 'getSocialLinkForRestaqurant/' + restaurant?._id)
                const fbObj = data?.find(item => item.name === 'facebook')
                setFbVisibility(fbObj.visibility)
                setFbLink(fbObj.link)
                const instaObj = data?.find(item => item.name === 'instagram')
                setInstaVisibility(instaObj.visibility)
                setInstaLink(instaObj.link)
                setIsLoading(false)
            }
            fetchAndSetSocialLinks()

            async function restaurantAreas() {
                setIsLoading(true)
                const { data } = await axios.get(RESTAURANT_AREAS_API + 'getEmeraldAreaFromRestaurant/' + restaurant?._id);
                setRestaurantArea(data);
                setIsLoading(false)
            }
            restaurantAreas()
        }

    }, [restaurant, setIsLoading])

    return (
        <div className="restaurent-Details">
            <div className="container">
                {/* <div className="social_logo social-link">
                    {fbVisibility &&
                        <a href={fbLink} rel="noopener noreferrer" target="_blank"><img src={facebook} alt="" /></a>
                    }
                    {instaVisibility &&
                        <a href={instaLink} rel="noopener noreferrer" target="_blank"><img src={instragram} alt="" /></a>
                    }
                </div> */}
                <div className="trouvaille_logo">
                    <img className="restaLogo" src={IMAGE_URL + restaurant?.logo} alt="" />
                </div>
                <div className="restaurSubTitle">
                    <p>
                        Delivery
                        {restaurantArea?.length === 0 ? ' not ' : ' '}
                        available
                        {restaurantArea?.length > 0 && ' in '}
                        {restaurantArea?.map((area, index) => area.emeraldArea.name + (
                            restaurantArea?.length <= 1
                                ?
                                ''
                                :
                                (
                                    index === restaurantArea?.length - 1
                                        ?
                                        ''
                                        :
                                        (
                                            index === restaurantArea?.length - 2
                                                ?
                                                ' and '
                                                :
                                                ', '
                                        )
                                )

                        ))}
                    </p>
                </div>
                <div className="restaurDetails">
                    <p>{restaurant?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetails