import { Link } from "react-router-dom";
import DashHeader from "./DashHeader";

const Notification = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const notification = JSON.parse(localStorage.getItem('usernotification'));
    return (

        <>
            <DashHeader />
            <main className="main dash-main">
                <section className="section dash-account">
                    <div className="wrapper">
                        <div className="boxes">
                        <div className="box">
                                <div className="main-row">
                                    <div className="avatar">
                                        <img src="../assets/icons8-user-80.png" alt="icons8-user-80" />
                                    </div>

                                    <div className="text">
                                        <h3 className="heading">{user.username}</h3>
                                        <p className="paragraph">{user.title}</p>
                                        <div className="location-row">
                                            <span><p className="paragraph">{user.country}</p></span>
                                            <span><p className="paragraph">{user.city}</p></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="followers">
                                    <div className="follow-box">
                                        <h3 className="heading">{user.followers}</h3>
                                        <p className="paragraph">Followers</p>
                                    </div>

                                    <div className="follow-box">
                                        <h3 className="heading">{user.following}</h3>
                                        <p className="paragraph">Following</p>
                                    </div>
                                </div>
                            </div>

                            <div className="tabs-wrapper">
                                <div className="tabs">
                                <Link to="/account"><div className="tab"><h3 className="heading">Overview</h3></div></Link>
                                    <Link to="/documents"><div className="tab"><h3 className="heading">KYC Verification</h3></div></Link>
                                    <Link to="/projects"><div className="tab"><h3 className="heading">Upload Projects</h3></div></Link>
                                </div>

                                <Link to="/profile"><button>Edit Profile</button></Link>
                            </div>

                            {notification ? ("") : (
                                <div className="box empty">
                                    <h3 className="heading">This user does not have notifications now </h3>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
 
export default Notification;