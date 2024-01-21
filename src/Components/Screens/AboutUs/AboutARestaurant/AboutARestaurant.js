import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./AboutARestaurant.css";
import { IMAGE_URL } from "../../../../Utilities/APIs";
import { IoMdCall } from "react-icons/io";
import callIcon from "../../../Assets/icons/call-icon.svg";
import messageIcon from "../../../Assets/icons/message.svg";

function AboutARestaurant({
  logo,
  aboutName,
  aboutCuisine,
  paragraphOne,
  paragraphTwo,
  paragraphThree,
  link,
  imageAndText,
  aboutImageOne,
  aboutImageTwo,
  id,
}) {
  const navigate = useNavigate();
  return (
    //    { <div id={id} className="carousel-content">
    //         <div className={`carousel-left ${imageAndText === 'imageBeforeText' ? 'order-left' : 'order-right'} white_pagination`}>
    //             <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
    //                 <SwiperSlide><img src={IMAGE_URL + aboutImageOne} alt="" /></SwiperSlide>
    //                 <SwiperSlide><img src={IMAGE_URL + aboutImageTwo} alt="" /></SwiperSlide>
    //                 {/* <SwiperSlide><img src={image} alt="" /></SwiperSlide> */}
    //             </Swiper>
    //         </div>
    //         <div className={`carousel-right ${imageAndText === 'imageBeforeText' ? 'order-right' : 'order-left'}`}>
    //             <div className="carousel-details">
    //                 <div className="indCompLogo">
    //                     <img src={logo} alt="" />
    //                 </div>

    //                 <p>
    //                     {paragraphOne}
    //                     {
    //                         paragraphTwo &&
    //                         <span>
    //                             {paragraphTwo}
    //                         </span>
    //                     }
    //                     {
    //                         paragraphThree &&
    //                         <span>
    //                             {paragraphThree}
    //                         </span>
    //                     }
    //                 </p>
    //                 <button onClick={() => navigate(link)}>view Menu</button>
    //             </div>
    //         </div>
    //     </div>}

    <div>
      {/* <div className={`carousel-right ${imageAndText === 'imageBeforeText' ? 'order-right' : 'order-left'}`}> */}
      <div className="restaurants">
        <div className="carousel-details">
          <div className="indCompLogo">
            <img src={logo} alt="" />
          </div>
          <div className="restaurants-left">
            <div>
              <h3 className="about-name">{aboutName}</h3>
              <h3 className="about-cuisine">{aboutCuisine}</h3>
              <p>
                {paragraphOne}
                {paragraphTwo && <span>{paragraphTwo}</span>}
                {paragraphThree && <span>{paragraphThree}</span>}
              </p>
            </div>
            <div className="restaurants-button">
              <button onClick={() => navigate(link)}>
                <span>view Menu</span>
              </button>
              <div className="restaurants-button-icon">
                <svg
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Inner Plugin Iframe">
                    <path
                      id="Vector"
                      d="M22.3326 15.5C21.0101 15.5 19.6954 15.3145 18.4348 14.9502C18.0504 14.8501 17.6113 14.8999 17.3369 15.2002L14.9209 17.4C11.7914 15.9502 9.26612 13.65 7.67372 10.7998L10.0897 8.60011C10.3641 8.35012 10.4738 7.95023 10.3641 7.60013C9.92474 6.45023 9.70521 5.25 9.70521 3.99998C9.70521 3.45019 9.21115 3 8.60719 3H4.76404C4.16008 3 3.66602 3.45019 3.66602 3.99998C3.66602 13.3999 12.0113 21 22.3326 21C22.9364 21 23.4307 20.5498 23.4307 20V16.5C23.4307 15.9502 22.9364 15.5 22.3326 15.5Z"
                      fill="#383838"
                    />
                  </g>
                </svg>
              </div>
              <div className="restaurants-button-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                >
                  <path
                    d="M17.9411 10H17.9521M13.549 10H13.5599M9.15681 10H9.16779M8.05877 16V21L13.549 16H22.3333V4H4.76465V16H8.05877Z"
                    stroke="#383838"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr id="restaurants-hr" />
    </div>
  );
}

export default AboutARestaurant;
