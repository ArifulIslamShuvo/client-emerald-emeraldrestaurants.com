import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

function SubmenuSwip({categories,activeMenu,setActiveMenu,allCategories}) {
  return (
    <div className="about-hero-logo container">
                <div className="swiper_container common_swiper black_pagination" id="logosub-menu">
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
                            prevEl: '#logosub-menu .swiper-button-prev',
                            nextEl: '#logosub-menu .swiper-button-next'

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
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}

                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                    >


                        {categories?.map((cat, index) => (
                            <SwiperSlide key={cat._id} >
                                <li className={`nav-item ${index === activeMenu && 'active'}`} key={cat._id}  onClick={() => setActiveMenu(index)}>
                                        <a 
                                        href={`#${index}`} 
                                        className={`nav-link `}
                                        >
                                            {allCategories?.find(c => c._id === cat._id)?.name}
                                        </a>
                                       
                                    </li>
                            </SwiperSlide>
                        ))}
                    </Swiper>
    </div>
    </div>
  )
}

export default SubmenuSwip