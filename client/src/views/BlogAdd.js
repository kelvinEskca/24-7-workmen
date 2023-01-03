import React,{useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const BlogAdd = () => {
    axios.defaults.withCredentials = true;
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [blogname,setBlogname] = useState('');
    const [blogdescription,setBlogdescription] = useState('');
    const [blogcategory,setBlogcategory] = useState('');
    const [blogimage,setImage] = useState([]);

    const navigate = useNavigate();
    const formData = new FormData();
    formData.append("blogname", blogname);
    formData.append("blogdescription", blogdescription);
    formData.append("blogcategory", blogcategory);
    Array.from(blogimage).forEach(item =>{
        formData.append("photos", item);
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(blogname !== '' || blogcategory !== "" || blogdescription !== "" || blogimage !== ""){
            try{
                const blogAdd = await axios.post('http://localhost:5000/api/blog',
                formData,{ headers:{token:token} });
                if(blogAdd.status === 200){
                    alert('Blog Added');
                    navigate('/blogList');
                }
                else{
                    alert('Blog Not Added');
                    navigate('/blogadd');
                }
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            alert("Please Ensure all fields are filled");
        }
    }
    
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

                            <div className="box empty profile">
                                <h3 className="heading">Add Blogs</h3>
                                <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="label-row">
                                        <label htmlFor="#">Blog Name
                                            <input type="text"  onChange={(e)=>{
                                                setBlogname(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">Blog Category
                                            <input type="text"  onChange={(e)=>{
                                                setBlogcategory(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Blog Description
                                        <textarea name="text" id="text" cols="30" rows="10" onChange={(e)=>{
                                            setBlogdescription(e.target.value)}}></textarea>
                                    </label>

                                    <div className="label-row upload">
                                        {Array.from(blogimage).map((item,i)=>
                                        (
                                            <label htmlFor="#" key={i}>Blog Image
                                                <div className="uploadBtn">
                                                    <div className="circle">+</div>
                                                    Choose a file
                                                    <input type="file" filename="photos" multiple onChange={(e)=>{
                                                    setImage(e.target.files)}} className="input"/>
                                                    <img alt={blogimage.name} src={URL.createObjectURL(item)} />
                                                </div>
                                            </label>
                                        ))}

                                        <label htmlFor="#">Blog Image
                                            <div className="uploadBtn">
                                                <div className="circle">+</div>
                                                Choose a file
                                                <input type="file" filename="photos" multiple onChange={(e)=>{
                                                setImage(e.target.files)}} className="input"/>
                                            </div>
                                        </label>
                                    </div>

                                    <label htmlFor="#">
                                        <button type="submit">Add Blog</button>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
 
export default BlogAdd;