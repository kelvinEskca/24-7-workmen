import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import Card from "../components/Card";

const AdminDashboard = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [blogs,settotalblog] = useState([]);
    const [category,settotalcategory] = useState([]);
    const [adverts,setprojects] = useState([]);
    const [artisans,setartisans] = useState([]);
    const [users,setusers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [contact,setcontact] = useState([]);
    const [newsletter,setnewsletter] = useState([]);
    const [kyc,setkyc] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        const getblog = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/blog');
                settotalblog(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getblog();

        const getkyc = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/kyc',{headers:{token:token}});
                setkyc(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getkyc();

        const getnews = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/news',{headers:{token:token}});
                setnewsletter(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getnews();

        const getcontact = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/contact',{headers:{token:token}});
                setcontact(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getcontact();

        const getcategory = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/category');
                settotalcategory(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getcategory();

        const getprojects = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/projects');
                setprojects(res.data.total);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getprojects();

        const getartisans = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/artisans');
                setartisans(res.data.total);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getartisans();

        const getusers = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/users',{headers:{token:token}});
                setusers(res.data.total);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getusers();
    },[token]);
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
                            </div>
                        
                            <div className="tabs-wrapper">
                                <div className="tabs">
                                    <Link to="/admindashboard"><div className="tab active"><h3 className="heading">Overview</h3></div></Link>
                                    <Link to="/artisanList"><div className="tab"><h3 className="heading">View Artisans</h3></div></Link>
                                    <Link to="/userList"><div className="tab"><h3 className="heading">View Users</h3></div></Link>
                                    <Link to="/documentsList"><div className="tab"><h3 className="heading">View KYC Requests</h3></div></Link>
                                    <Link to="/projectsList"><div className="tab"><h3 className="heading">View Adverts</h3></div></Link>
                                    <Link to="/categoryList"><div className="tab"><h3 className="heading">View Categories</h3></div></Link>
                                    <Link to="/blogList"><div className="tab"><h3 className="heading">View Blogs</h3></div></Link>
                                </div>
                            </div>

                            <div className="details-wrapper">
                                <section className="section categories">
                                    <div className="wrapper">
                                        <div className="boxes">
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total Users'} paragraph={users}/>
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total Artisan'} paragraph={artisans}/>
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total Blogs'} paragraph={blogs}/>
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total Adverts'} paragraph={adverts}/>
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total Categories'} paragraph={category}/>
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total Contact Request'} paragraph={contact}/>
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total Newsletter Request'} paragraph={newsletter}/>
                                            <Card image={'../assets/icons8-bill-60.png'} heading={'Total KYC Request'} paragraph={kyc}/>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
 
export default AdminDashboard;