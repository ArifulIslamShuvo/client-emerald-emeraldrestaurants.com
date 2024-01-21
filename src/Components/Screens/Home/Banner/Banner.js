import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { HERO_SLIDERS_API, IMAGE_URL } from "../../../../Utilities/APIs";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";


import './Banner.css'
import AppContext from "../../../../Context/AppContext";

const Banner = ({ bannerRef }) => {
const { setIsLoading } = useContext(AppContext)

    const [sliders, setSliders] = useState(null);
    useEffect(() => {

        async function heroSliders() {
            setIsLoading(true)
            const { data } = await axios.get(HERO_SLIDERS_API);
            setSliders(data);
            setIsLoading(false)
        }
        heroSliders()
         
    }, [setIsLoading])


    return (
        <div className="banner" ref={bannerRef}>
            <Swiper
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    sliders?.map(slider =>
                        <SwiperSlide key={slider._id}>
                            <div className="banner_item">
                                <img className="lg_img" src={IMAGE_URL + slider?.image} alt="" />
                                <img className="sm_img" src={IMAGE_URL + slider?.mobileImage} alt="" />
                                {/* <div className="banner_item_content">
                                    <h1 className="banner_title">10% OFF ON
                                        DIRECT PICK UPS!</h1>
                                    <Link to={slider.link}>
                                        <button className="order-btn">Order Now!</button>
                                    </Link>
                                </div> */}
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>

        </div>
    )
}

export default Banner;