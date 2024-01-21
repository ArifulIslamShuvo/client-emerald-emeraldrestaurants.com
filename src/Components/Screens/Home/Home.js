import { useEffect, useRef, useState } from 'react';
import Navbar from '../../Partials/Sections/Navbar/Navbar';
import Banner from './Banner/Banner';
import Deals from './Deals/Deals';
import Dishes from './Dishes/Dishes';
import HomeRestaurant from './HomeRestaurant/HomeRestaurant';

import './Home.css'
import HomeContact from './HomeContact/HomeContact';

const Home = () => {

    const bannerRef = useRef()
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        let bannerHeight = bannerRef.current.clientHeight;
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > (bannerHeight - 80))
        })
    }, []);

    return (
        <div>
            <Navbar darkBg={`bg-trns-fixed ${scroll ? 'bg-dark' : ''}`} />
            <Banner bannerRef={bannerRef} />
            <HomeRestaurant />
            <Deals />
            <Dishes />
            <HomeContact/>
        </div>
    ) 
}
export default Home;
