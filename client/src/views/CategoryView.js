import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import { useParams } from 'react-router-dom';
const CategoryView = () => {
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);

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

    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/category/${id}`,{headers:{token:token}});
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

                            <div className="box empty profile">
                                <h3 className="heading">Add Category</h3>
                                <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="label-row upload">
                                        <label htmlFor="#">Category Name
                                            <input type="text" value={list.categoryname}  onChange={(e)=>{
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
                                                <img alt={list.image.name} src={`../assets/${list.image[0].originalname}`} />
                                            </div>
                                        </label>
                                    </div>

                                    
                                    <label htmlFor="#">
                                        <button>Edit Category</button>
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
export default CategoryView;