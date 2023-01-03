import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import { useParams } from 'react-router-dom';
const UserView = () => {
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
   
    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/users/${id}`,{headers:{token:token}});
                setList(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[id,token]);

    if(loading) return <h1>Loading</h1>;
    return (
        <>
            <DashHeader />
            <main className="main dash-main">
                <section className="section dash-account dash-profile">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <div className="main-row">
                                    <div className="avatar">
                                        <img src="../assets/icons8-user-80.png" alt="icons8-user-80" />
                                    </div>

                                    <div className="text">
                                        <h3 className="heading">{userData.username}</h3>
                                        <p className="paragraph">{userData.title}</p>
                                        <div className="location-row">
                                            <span><p className="paragraph">{userData.country}</p></span>
                                            <span><p className="paragraph">{userData.city}</p></span>
                                        </div>
                                    </div>

                                    <Link to='/admindashboard'><button>Go Back</button></Link>
                                </div>
                            </div>

                            <div className="details-wrapper">
                                <div className="box empty">
                                    <div className="empty-row">
                                        <h3 className="heading">Firstname:</h3>
                                        <p className="paragraph">{list.firstname}</p>
                                    </div>
                                    <div className="empty-row">
                                        <h3 className="heading">Lastname:</h3>
                                        <p className="paragraph">{list.lastname}</p>
                                    </div>
                                    <div className="empty-row">
                                        <h3 className="heading">Address:</h3>
                                        <p className="paragraph">{list.address}</p>
                                    </div>
                                    <div className="empty-row">
                                        <h3 className="heading">City</h3>
                                        <p className="paragraph">{list.city}</p>
                                    </div>
                                    <div className="empty-row">
                                        <h3 className="heading">Country</h3>
                                        <p className="paragraph">{list.country}</p>
                                    </div>
                                </div>
                                <div className="box empty">
                                    <h3 className="heading">About User</h3>
                                    <p className="paragraph">{list.aboutme}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
export default UserView;