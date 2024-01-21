import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Deals.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FEATURED_COMBOS_API, IMAGE_URL } from "../../../../Utilities/APIs";
import ComboItems from "./ComboItems/ComboItems";
import { takaFormatter } from "../../../../Utilities/Formatter";
import ItemsCard from "../../ItemsCard/ItemsCard";
import AppContext from "../../../../Context/AppContext";

function Deals() {

    const [combos, setCombos] = useState(null)
    const { setIsLoading } = useContext(AppContext)

    useEffect(() => {

        async function getAndSetCombos() {
            setIsLoading(true)

            const { data } = await axios.get(FEATURED_COMBOS_API + 'getAllForCustomers');
            setCombos(data);
            setIsLoading(false)
        }
        getAndSetCombos()

    }, [setIsLoading])

    // const combo =  combos?.map(i => i._id)
    // const item =  cartItems?.map(c => c.item)
    // console.log("🚀 ~ file: Deals.js:39 ~ Deals ~ item:", item )

    return (
        <section className="deals-section ddls_section spy">
            <div className="home_container">
                <div className="ddls_header">
                    <h2 className="ddls_title">Deals Only Found Here</h2>
                </div>
                <div className="swiper_container common_swiper black_pagination" id="dealSwp">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-pagination"></div>
                    <Swiper
                        slidesPerView={2}
                        centeredSlides={true}
                        // loop={true}
                        spaceBetween={15}
                        pagination={{
                            el: '#dealSwp .swiper-pagination',
                            clickable: true
                        }}
                        navigation={{
                            prevEl: '#dealSwp .swiper-button-prev',
                            nextEl: '#dealSwp .swiper-button-next'

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
                            combos?.map(combo => (

                                <SwiperSlide key={combo._id}>

                                    <div className="card dealsCard">
                                        <div className="overlayDealsBox">
                                               <img src={IMAGE_URL + combo.item.image} className="card-img-top" alt="..." />
                                            <div className="overlayDealsBtn">
                                                View Platter Items
                                                <div className="overlayDealsContent">
                                                    <ComboItems
                                                        restaurant={combo.item.restaurant ? combo.item.restaurant.name : 'Yo'}
                                                        price={combo.item.price}
                                                        item={combo.item}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card_res_name">{combo.item.restaurant ? combo.item.restaurant.name : 'Yo'}</h6>
                                            <h3 className="card_title">{combo.item.name}</h3>
                                            <h2 className="card_price">{takaFormatter(combo.item.price)}</h2>
                                            <ItemsCard
                                                item={combo.item}
                                                restaurantId={combo.item.restaurant._id}
                                            />

                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div >
            </div>
        </section>
    )
}

export default Deals;