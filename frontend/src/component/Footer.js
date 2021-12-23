import logo from './imgs/logo2.png';
import phone from './imgs/phone_icon.png';
import location from "./imgs/location.png"
import './footer.css'

import { useNavigate } from 'react-router-dom';
function Footer() {

    const navigate = useNavigate();


    return (
        <>
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-12">
                            <div class="footer_blog_section">
                                <img className='img' src={logo} alt="#" />
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-12">
                            <div class="item">
                                <h4 class="text-uppercase">Navigation</h4>
                                <ul>
                                    <li><a href="/Home">Home</a></li>
                                    <li><a href="/Home#about">About</a></li>
                                    <li><a href="/Home#service">Service</a></li>

                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12">
                            <div class="item">
                                <h4 class="text-uppercase">Services</h4>
                                <li><a href="/services/Air condition"> Air Conditioning</a></li>
                                <li><a href="/services/Electrical">Electrical</a></li>
                                <li><a href="/services/Electronic devices">Electronic devices</a></li>
                                <li><a href="/services/Sterilization">Sterilization</a></li>

                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12">
                            <div class="item">
                                <h4 class="text-uppercase">Contact Info</h4>
                                <p><strong>Corporate Office Address:</strong></p>
                                <p><img src={location} alt="#" />Riyadh , Saudi Arabia</p>
                                <p id="contact"><strong>Customer Service:</strong></p>
                                <p><img src={phone} alt="#" /> 966 557 200 787 </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="copyright text-center">
                    <p>Copyright 2021  Design by Sarah Mira </p>
                </div>
            </footer>
        </>
    )
}
export default Footer;