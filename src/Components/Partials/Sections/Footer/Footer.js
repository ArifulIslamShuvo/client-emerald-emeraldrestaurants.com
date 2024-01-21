import { Link } from "react-router-dom";
import logo from "../../../../Assets/images/About Us/logo.png";
import logo2 from "../../../../Assets/images/icons/Inner-Plugin-Iframe.svg";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="foot-cont">
        {/* <div className="footer-items">
            <div className="footer-logo">
                <img src={logo} alt="" />
            </div>
            <div className="footer-menu">
                <ul>
                    <li><Link to="/aboutUs">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
        </div> */}

        <div className="footer-items">
          <div className="footer-text">
            <p>Copyright@<span className="test-left">EmeraldRestaurants</span>2023</p>
          </div>
          <div className="vertical"></div>
          <div className="footer-logo">
            <img src={logo} alt="" />
          </div>
          <div className="vertical"></div>
          <div className="footer-text">
            <p>Made with <span><img src={logo2} alt=""/> </span> by <span className="yellow">Antopolis</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
