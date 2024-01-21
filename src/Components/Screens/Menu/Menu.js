import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// Import Swiper React components
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card/Card";
import Submenu from "./Submenu/Submenu";
import RestaurantDetails from "../Home/HomeRestaurant/RestaurantDetails/RestaurantDetails";
import { CATEGORIES_API, IMAGE_URL, ITEMS_API, RESTAURANTS_API } from "../../../Utilities/APIs";
import Navbar from "../../Partials/Sections/Navbar/Navbar";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './Menu.css'
import AppContext from "../../../Context/AppContext";

function Menu() {

    const bannerRef = useRef()
    const { Id } = useParams()
    const [scroll, setScroll] = useState(false)
    const [restaurant, setRestaurant] = useState(null)
    const [categories, setCategories] = useState(null)
    const [allCategories, setAllCategories] = useState(null)
    const [activeMenu, setActiveMenu] = useState();

    const { setIsLoading } = useContext(AppContext)

    useEffect(() => {
        async function getAndSetCategories() {
            setIsLoading(true)
            const { data } = await axios.get(CATEGORIES_API)
            setAllCategories(data)
            setIsLoading(false)
        }
        getAndSetCategories()
    }, [setIsLoading])

    useEffect(() => {
        if (restaurant !== null) {
            let bannerHeight = bannerRef.current.clientHeight;
            window.addEventListener("scroll", () => {
                setScroll(window.scrollY > (bannerHeight - 80))
            })
        }
    }, [restaurant]);

    useEffect(() => {

        async function fetchAndSetRestaurant() {
            setIsLoading(true)
            const { data } = await axios.get(RESTAURANTS_API + 'getSingleRestaurant/' + Id)
            setRestaurant(data);
            setIsLoading(false)
        }

        async function fetchAndSetCategories() {
            setIsLoading(true)
            const { data } = await axios.get(ITEMS_API + 'getSingleRestaurantItems/' + Id)
            setCategories(data);
            setIsLoading(false)
        }

        fetchAndSetRestaurant()
        fetchAndSetCategories()

    }, [Id, setIsLoading])


    return (
        <div className="menu_page">
            <Navbar darkBg={`bg-trns-fixed ${scroll ? 'bg-dark' : ''}`} />
            <Swiper
                ref={bannerRef}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,

                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper menu_banner_slider"
            >
                <SwiperSlide>
                    <div className="banner_item">
                        <img src={IMAGE_URL + restaurant?.coverImage} alt="" />
                        <div className="banner_item_title">
                            <div className="banner_item-content">
                             <RestaurantDetails
                                 restaurant={restaurant}/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="banner_item">
                        <img src={IMAGE_URL + restaurant?.coverImage2} alt="" />
                        <div className="banner_item_title">
                            <div className="banner_item-content">
                             <RestaurantDetails
                                 restaurant={restaurant}/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* <RestaurantDetails
                restaurant={restaurant}
            /> */}

            <Submenu
                categories={categories}
                allCategories={allCategories}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
            />
            <div className="categories_wrapper">
                <div className="container">
                    {categories?.map((cat, index) => (
                        <div className={`categories_items ${index === activeMenu && 'active'}`} key={cat._id} id={index}>
                            <h1 className="categoriesTitle">
                                {allCategories?.find(c => c._id === cat._id)?.name}
                            </h1>
                            <div className="menuItem">
                                {
                                    cat.items?.map(item =>
                                        <Card
                                            item={item}
                                            key={item.name}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Menu