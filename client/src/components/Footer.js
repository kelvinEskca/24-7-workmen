import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-wrapper">
                <div className="footer-box">
                    <h3 className="heading">About Us</h3>
                    <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto beatae maiores unde dolorum quae vel necessitatibus, voluptas dicta sapiente? At?</p>
                </div>
                
                <div className="footer-box">
                    <h3 className="heading">Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/faq'>FAQ</Link></li>
                        <li><Link to='/how'>Service</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        <li><Link to='/wishlist'>Wishlist</Link></li>
                    </ul>
                </div>

                <div className="footer-box">
                    <h3 className="heading">Contact Info</h3>
                    <div className="contact">
                        <img src="../assets/icons8-home-address-30.png" alt="icon" />
                        <p className="paragraph">2561 Round Table Drive Cincinnati, OH 45202</p>
                    </div>

                    <div className="contact">
                        <img src="../assets/icons8-iphone-14-pro-30.png" alt="icon" />
                        <Link to='tel:+555-22-55' className="paragraph">555-22-55</Link>
                    </div>

                    <div className="contact">
                        <img src="../assets/icons8-composing-mail-30.png" alt="icon" />
                        <Link to='mailto:support@mail.com' className="paragraph">support@mail.com</Link>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <span>&copy; 24/7 Workmen. All Rights Reserved.</span>
            </div>
        </footer>
    );
}
 
export default Footer;