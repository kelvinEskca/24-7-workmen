import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const EditCategory = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    const [categoryname,setCategoryname] = useState('');
    const [image,setImage] = useState('');

    const navigate = useNavigate();
    const formData = new FormData();
    formData.append("categoryname", categoryname);
    formData.append("photos", image);
   

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const id = userData._id;
        if(categoryname !== '' || image !== ""){
            try{
                const categoryAdd = await axios.post(`http://localhost:5000/api/category/${id}`,
                {
                    formData
                },{ headers:{token:token} });
                if(categoryAdd.status === 200){
                    navigate('/admindashboard');
                }
                else{
                    console.log(categoryAdd.message);
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

                                    <Link to="/admindashboard"><button>Go Back</button></Link>
                                </div>
                            </div>

                            <div className="box empty profile">
                                <h3 className="heading">Add Category</h3>
                                <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="label-row">
                                        <label htmlFor="#">Category Name
                                            <input type="text"  onChange={(e)=>{
                                                setCategoryname(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">Category Image
                                            <input type="file" filename="photos" onChange={(e)=>{
                                                setImage(e.target.files)}}/>
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
 
export default EditCategory;