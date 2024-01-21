import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Dishes.css";
import {  useContext, useEffect, useState } from "react";
import axios from "axios";
import { FEATURED_ITEMS_API, IMAGE_URL } from "../../../../Utilities/APIs";

import ItemsCard from "../../ItemsCard/ItemsCard";
import AppContext from "../../../../Context/AppContext";

function Dishes() {
    const [featuredItems, setFeaturedItems] = useState(null)
    const { setIsLoading } = useContext(AppContext)

    useEffect(() => {

        async function getFeaturedItems() {
            setIsLoading(true)
            const { data } = await axios.get(FEATURED_ITEMS_API + 'getAllForCustomers');
            setFeaturedItems(data);
            setIsLoading(false)
        }

        getFeaturedItems()


    }, [setIsLoading])
    return (
        <section className="dishes-section ddls_section spy">
            <div className="home_container">
                <div className="ddls_header">
                    <h2 className="ddls_title">Popular Dishes</h2>
                </div>
                <div className="swiper_container common_swiper black_pagination" id="dishesSwp">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-pagination"></div>
                    <Swiper
                        slidesPerView={1.4}
                        centeredSlides={true}
                        // loop={true}
                        spaceBetween={15}
                        pagination={{
                            el: '#dishesSwp .swiper-pagination',
                            clickable: true
                        }}
                        navigation={{
                            prevEl: '#dishesSwp .swiper-button-prev',
                            nextEl: '#dishesSwp .swiper-button-next'

                        }}
                        breakpoints={{
                            768: {
                                centeredSlides: false,
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                centeredSlides: false,
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}

                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >

                        {
                            featuredItems?.map(featuredItem =>
                                <SwiperSlide key={featuredItem._id}>
                                    <div className="card dishesCard">
                                        <div className="overlayDealsBox">
                                            <img src={IMAGE_URL + featuredItem?.item?.image} className="card-img-top" alt="..." />

                                        </div>
                                        <div className="card-body">
                                            <h6 className="card_res_name">{featuredItem?.item.restaurant.name}</h6>
                                            <h3 className="card_title">{featuredItem?.item.name}</h3>
                                            <h2 className="card_price">Tk. {featuredItem?.item.price}</h2>

                                            <ItemsCard
                                                item={featuredItem?.item}
                                                restaurantId={featuredItem?.item?.restaurant?._id}

                                            />

                                          
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }


                    </Swiper>
                </div >
            </div>
        </section>
    )
}

export default Dishes