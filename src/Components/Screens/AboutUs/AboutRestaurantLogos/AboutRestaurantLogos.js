// import thaiEmerId from '../../../Assets/restaurant-logos/Thai Emerald.png'
// import kiyoshi from '../../../Assets/restaurant-logos/Kiyoshi.png'
// import trouvaille from '../../../Assets/restaurant-logos/Trouvaille.png'
// import redChamber from '../../../Assets/restaurant-logos/Red-Chamber.png'
// import groveBistro from '../../../Assets/restaurant-logos/Grove Bistro.png'
// import gusto from '../../../Assets/restaurant-logos/Gusto.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { IMAGE_URL } from '../../../../Utilities/APIs'
import './AboutRestaurantLogos.css'

function AboutRestaurantLogos({ restaurants }) {
    return (
        <>
            <div className="about-hero-logo container">
                <div className="swiper_container common_swiper black_pagination" id="logosSwp">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <Swiper
                        slidesPerView={3}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        navigation={{
                            prevEl: '#logosSwp .swiper-button-prev',
                            nextEl: '#logosSwp .swiper-button-next'

                        }}
                        spaceBetween={30}
                        breakpoints={{
                            768: {
                                centeredSlides: false,
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            1024: {
                                centeredSlides: false,
                                slidesPerView: 6,
                                spaceBetween: 60,
                            },
                        }}

                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                    >

                        {restaurants?.map((restaurant, index) => (
                            <SwiperSlide key={restaurant._id} >
                                <div className="about_logos">
                                    <a href={`#${index}`}>
                                        <img
                                            src={IMAGE_URL + restaurant?.logo}
                                            alt={restaurant?.name}
                                        />
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default AboutRestaurantLogos