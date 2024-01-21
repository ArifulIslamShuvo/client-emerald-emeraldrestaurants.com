import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { RESTAURANTS_API } from '../../../../Utilities/APIs';

import './HomeRestaurant.css'
import RestaurantCard from './RestaurantCard/RestaurantCard';
import AppContext from '../../../../Context/AppContext';

function HomeRestaurant() {

    const [restaurants, setRestaurants] = useState(null);
    const { setIsLoading } = useContext(AppContext)

    useEffect(() => {
        async function restaurants() {
            setIsLoading(true)
 
            const { data } = await axios.get(RESTAURANTS_API);
            setRestaurants(data);
            setIsLoading(false)
        }
        restaurants()
    }, [setIsLoading])

    return (
        <div className="home_container deliverSection spy">
            <div>
                <h1 className="homeTitle">YOU CHOOSE. WE DELIVER</h1>
            </div>
            <div className="food_grid">
                {
                    restaurants?.map(restaurant =>
                        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                    )
                }
            </div>
        </div>
    )

}

export default HomeRestaurant