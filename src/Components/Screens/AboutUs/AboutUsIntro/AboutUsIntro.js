import logoEmerald from '../../../../Assets/images/About Us/Logos/Emerald Group.svg' 
import imageOne from '../../../../Assets/images/About Us/image 6.png';

import './AboutUsIntro.css'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function AboutUsIntro() {

  
  return (
    <div className="about-hero">
        <div className="about-left">
        <img src={logoEmerald} alt="" />
        <p>The Emerald Group of Restaurants began their journey with the opening of Thai Emerald. Upon finding
        footing within the highly competitive Dhaka food industry the group diversified and forayed into
        multiple other cuisines through the launching of Fools Diner, Red Chamber, Kiyoshi, Grove Bistro,
        Gusto, Trouvaille and Emerald Bakery.</p>
        </div>
        <div className="about-right">
            <img src={imageOne} alt="" />
        </div>
      </div>
  )
} 

export default AboutUsIntro