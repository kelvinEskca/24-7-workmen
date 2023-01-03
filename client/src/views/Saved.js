import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";


const Saved = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const saves = JSON.parse(localStorage.getItem('wishlist'));
    const token = localStorage.getItem('token');
    const [loading,setLoading] = useState(true);
    const [kyc,setkyc] = useState([]);
    const [adverts,setprojects] = useState([]);
    const id = user._id;
    const email = user._email;
    useEffect(()=>{
        const getprojects = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/projects/ads/${id}`,{headers:{token:token}});
                setprojects(res.data.total);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getprojects();

        const getkyc = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/kyc/${email}`,{headers:{token:token}});
                setkyc(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getkyc();
    },[id,token,email]);
    if(loading) return <h1>Loading</h1>;
    return (

        <>
            <DashHeader />
            <main className="main dash-main">
                <section className="section dash-account">
                    <div className="wrapper">
                        <div className="boxes">
                        <div className="box">
                            <div className="main-row">
                                {user.image.length !== 0 ? (
                                    <div className="avatar">
                                        <img src={`../assets/${user.image[0].originalname}`} alt={user.image[0].originalname} />
                                    </div>
                                    
                                ) : (
                                    <div className="avatar">
                                        <img src="../assets/icons8-user-80.png" alt="icons8-user-80" />
                                    </div>
                                )}
                                
                                <div className="text">
                                    <h3 className="heading">{user.username}</h3>
                                    <p className="paragraph">{user.title}</p>
                                    <div className="location-row">
                                        <span><p className="paragraph">{user.country}</p></span>
                                        <span><p className="paragraph">{user.city}</p></span>
                                    </div>
                                </div>
                            </div>

                            {user.isArtisan ? (
                                <>
                                    <div className="followers">
                                        <div className="follow-box">
                                            <h3 className="heading">{user.followers}</h3>
                                            <p className="paragraph">Followers</p>
                                        </div>

                                        <div className="follow-box">
                                            <h3 className="heading">{user.following}</h3>
                                            <p className="paragraph">Following</p>
                                        </div>

                                        <div className="follow-box">
                                            <h3 className="heading">{adverts}</h3>
                                            <p className="paragraph">Adverts</p>
                                        </div>

                                        <div className="follow-box">
                                            <h3 className="heading">{kyc}</h3>
                                            <p className="paragraph">KYC</p>
                                        </div>
                                    </div>
                                </>
                            ):("")}
                        </div>

                        {user.isArtisan ? 
                            (   
                                <>
                                    <div className="tabs-wrapper">
                                        <div className="tabs">
                                            <Link to="/account"><div className="tab active"><h3 className="heading">Overview</h3></div></Link>
                                            <Link to="/projects"><div className="tab"><h3 className="heading">Adverts</h3></div></Link>
                                            <Link to="/documents"><div className="tab"><h3 className="heading">KYC</h3></div></Link>
                                            <Link to="/business"><div className="tab"><h3 className="heading">Business Information</h3></div></Link>
                                            <Link to="/profile"><button>Edit Profile</button></Link>
                                        </div>
                                    </div>
                                </>
                            ):(
                                <>
                                    <div className="tabs-wrapper">
                                        <div className="tabs">
                                        <Link to="/account"><div className="tab active"><h3 className="heading">Overview</h3></div></Link>
                                        </div>

                                        <Link to="/profile"><button>Edit Profile</button></Link>
                                    </div>
                                </>
                            )}

                            {saves ? (
                                saves.map((item,i)=>{
                                    return (
                                        <Link to={`/addetails/${item._id}`} key={i}>
                                            <div className="item-container saved-item">
                                                <div className="image-area">
                                                    <img src={`../assets/${item.image[0].originalname}`} alt={item.firstname} />
                                                </div>
                                                <div className="text-area">
                                                    <h3 className="heading">{item.projectname}</h3>
                                                    <p className="paragraph">{item.projectdescription}</p>
                                                    <div className="category-banne">
                                                        <div className="banner"><h3 className="heading">{item.category}</h3></div>
                                                    </div>

                                                    <div className="location">
                                                        <img src="../assets/icons8-map-pin-30.png" alt="icons8-map-pin-30.png" />
                                                        <p className="paragraph">{item.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            ) : (
                                <div className="box empty">
                                    <h3 className="heading">This user does not have saves now </h3>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
 
export default Saved;