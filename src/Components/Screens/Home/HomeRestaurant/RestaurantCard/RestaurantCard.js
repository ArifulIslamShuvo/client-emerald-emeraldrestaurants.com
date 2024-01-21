import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './RestaurantCard.css'
import { IMAGE_URL, RESTAURANT_AREAS_API } from '../../../../../Utilities/APIs'
import axios from 'axios';
import AppContext from '../../../../../Context/AppContext';

function RestaurantCard({ restaurant }) {
    const [restaurantArea, setRestaurantArea] = useState(null);
    const { selectedArea, setIsLoading } = useContext(AppContext)


    useEffect(() => {
        if (restaurant) {
            async function restaurantAreas() {
                setIsLoading(true)
                const { data } = await axios.get(RESTAURANT_AREAS_API + 'getEmeraldAreaFromRestaurant/' + restaurant?._id);
                setRestaurantArea(data);
                setIsLoading(false)
            }
            restaurantAreas()
        }

    }, [restaurant, setIsLoading])

    const deliveryInThisArea = restaurantArea?.map(a => a.emeraldArea.name)?.includes(selectedArea)

    return (
        <div className={`food-container ${deliveryInThisArea ? '' : 'not_selected_area'}`}>
            <Link to={`/menu/${restaurant._id}`} >
                <div className='card  deliverCard'>
                    <div className="card-overlay-box ">
                        <img src={IMAGE_URL + restaurant.homeCardImage} className="card-img-top" alt="..." />

                        <div className="card-overlay-content">
                            <div className="card-ovelay-inner">
                                <img src={IMAGE_URL + restaurant.logo} alt="" />
                                <p>
                                    Delivery
                                    {restaurantArea?.length === 0 ? ' not ' : ' '}
                                    available
                                    {/* available in {+ ' '} */}
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
                        </div>
                    </div>
                    <div className="card-body">
                        <h3 className="card_title">{restaurant.name}</h3>
                        <h4 className='card_cat_name'>{restaurant.cuisine}</h4>
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default RestaurantCard