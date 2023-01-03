import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const Category = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    const [categoryname,setCategoryname] = useState('');
    const [image,setImage] = useState([]);

    const navigate = useNavigate();
    const formData = new FormData();
    formData.append("categoryname", categoryname);
    Array.from(image).forEach(item =>{
        formData.append("photos", item);
    })
   

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(categoryname !== '' || image !== ""){
            try{
                const categoryAdd = await axios.post('http://localhost:5000/api/category',formData
                ,{ headers:{token:token} });
                if(categoryAdd.status === 200){
                    alert('Category Added Successfully!');
                    navigate('/categoryList');
                }
                else{
                    alert('Category Not Added Successfully!');
                    navigate('/categoryList');
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
                                <h3 className="heading">Add Category</h3>
                                <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="label-row upload">
                                        <label htmlFor="#">Category Name
                                            <input type="text"  onChange={(e)=>{
                                                setCategoryname(e.target.value)}}/>
                                        </label>

                                        {Array.from(image).map((item,i)=>
                                        (
                                            <label htmlFor="#" key={i}>Category Image
                                                <div className="uploadBtn">
                                                    <div className="circle">+</div>
                                                    Choose a file
                                                    <input type="file" filename="photos" multiple onChange={(e)=>{
                                                    setImage(e.target.files)}} className="input"/>
                                                    <img alt={image.name} src={URL.createObjectURL(item)} />
                                                </div>
                                            </label>
                                        ))}

                                        <label htmlFor="#">Category Image
                                            <div className="uploadBtn">
                                                <div className="circle">+</div>
                                                Choose a file
                                                <input type="file" filename="photos" multiple onChange={(e)=>{
                                                setImage(e.target.files)}} className="input"/>
                                            </div>
                                        </label>
                                    </div>

                                    
                                    <label htmlFor="#">
                                        <button type="submit">Add Category</button>
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
 
export default Category;