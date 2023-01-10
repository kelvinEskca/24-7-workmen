import React,{useState} from "react";
import { Link } from "react-router-dom";
const Header = () => {
    const [nav, setNav] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigationToggle = () => {
        setNav(nav => !nav);
    }
    return (
        <header className="header">
            <nav className={`mobile ${ nav ? 'drop' : 'closed' }`}>
                <div className="mobile-top">
                    <Link to='/'><img src="../assets/logo.jpeg" alt="logo" className="logo"/></Link>
                    <img src="/assets/icons8-menu-50.png" alt="menu" className="menu" onClick={navigationToggle}/>
                </div>

                

                <div className="mobile-bottom">
                    <ul className="list">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/faq'>FAQ</Link></li>
                        <li><Link to='/how'>Service</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        <li><Link to='/wishlist'>Wishlist</Link></li>
                        {user ? (
                            <>
                                {user.isAdmin ? (
                                    <>
                                    <li><Link to='/admindashboard'>Account</Link></li>
                                    </>
                                ) : (
                                    <>
                                    <li><Link to='/account'>Account</Link></li>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </>
                        )}
                        
                    </ul>
                </div>
            </nav>

            <nav className="desktop">
                <Link to='/'><img src="../assets/logo.jpeg" alt="logo" className="logo"/></Link>
                <div className="desktop-row">
                    <ul className="list">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/faq'>FAQ</Link></li>
                        <li><Link to='/how'>Service</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        <li><Link to='/wishlist'>Wishlist</Link></li>
                        {user ? (
                            <>
                                {user.isAdmin ? (
                                    <>
                                    <li><Link to='/admindashboard'>Account</Link></li>
                                    </>
                                ) : (
                                    <>
                                    <li><Link to='/account'>Account</Link></li>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </>
                        )}
                    </ul>
                    <ul className="social">
                        <li><Link><img src="../assets/icons8-facebook-30.png" alt="icon" /></Link></li>
                        <li><Link><img src="../assets/icons8-instagram-30.png" alt="icon" /></Link></li>
                        <li><Link><img src="../assets/icons8-twitter-30.png" alt="icon" /></Link></li>
                        <li><Link><img src="../assets/icons8-telegram-app-30.png" alt="icon" /></Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
 
export default Header;