// import rectangle1 from '../../../Assets/images/About Us/Rectangle 4-1.png';
// import thai from '../../../Assets/images/About Us/Logos/thai-emerald.png'
import AboutARestaurant from './AboutARestaurant/AboutARestaurant';
import AboutUsIntro from './AboutUsIntro/AboutUsIntro';
import Navbar from '../../Partials/Sections/Navbar/Navbar';
import AboutRestaurantLogos from './AboutRestaurantLogos/AboutRestaurantLogos';

import './AboutUs.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IMAGE_URL, RESTAURANTS_API } from '../../../Utilities/APIs';
import AppContext from '../../../Context/AppContext';


function AboutUs() {

    const [restaurants, setRestaurants] = useState(null);
    console.log("🚀 ~ AboutUs ~ restaurants:", restaurants)
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
        <>
            <Navbar darkBg='bg-dark' />
            <div className='about-us-section '>
                <div className="about_hero_wrapper spt">
                    <div className="container">
                        <AboutUsIntro />
                    </div>
                </div>

                <AboutRestaurantLogos restaurants={restaurants} />
                <div className="container">
                    <div className="restaurant-description spt">
                        {restaurants?.map((restaurant, index) => (
                            <AboutARestaurant
                                id={index}
                                // image={IMAGE_URL + restaurant.homeCardImage}
                                aboutImageOne={restaurant.aboutUsImage1}
                                aboutName={restaurant.name}
                                aboutCuisine={restaurant.cuisine}
                                aboutImageTwo={restaurant.aboutUsImage2}
                                logo={IMAGE_URL + restaurant.logo}
                                paragraphOne={restaurant.description}
                                // paragraphTwo='Starting from the menu to one’s favourite table, it locks a sense of familiarity with every visit. It also allows people to experience the best of both worlds in terms of a fine dine-out of a three-course meal along with the relaxed drawing-room conversations.'
                                // paragraphThree="In short, it’s a place where one will always come back."
                                link={'/menu/' + restaurant._id}
                                imageAndText={index % 2 === 0 ? 'imageBeforeText' : 'imageAfterText'}
                            />
                        ))}

                    </div>
                </div>
            </div>

        </>
    );
};

export default AboutUs;