import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import { useParams } from 'react-router-dom';
const BlogView = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [list,setList] = useState([]);
    const [blognameEdit,setBlogname] = useState('');
    const [blogdescriptionEdit,setBlogdescription] = useState('');
    const [blogcategoryEdit,setBlogcategory] = useState('');
    const [blogimageEdit,setImage] = useState([]);
    const [loading,setLoading] = useState(true);

    const formData = new FormData();
    formData.append("blogname", blognameEdit);
    formData.append("blogdescription", blogdescriptionEdit);
    formData.append("blogcategory", blogcategoryEdit);
    Array.from(blogimageEdit).forEach(item =>{
        formData.append("photos", item);
    })

    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
                setList(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[id]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(blognameEdit !== '' || blogcategoryEdit !== "" || blogdescriptionEdit !== "" || blogimageEdit !== ""){
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
    const {blogname,blogcategory,blogdescription,blogimage} = list;

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
                                <h3 className="heading">Add Blogs</h3>
                                <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="label-row">
                                        <label htmlFor="#">Blog Name
                                            <input type="text" value={blogname}  onChange={(e)=>{
                                                setBlogname(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">Blog Category
                                            <input type="text" value={blogcategory}  onChange={(e)=>{
                                                setBlogcategory(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Blog Description
                                        <textarea name="text" id="text" cols="30" rows="10" value={blogdescription} onChange={(e)=>{
                                            setBlogdescription(e.target.value)}}></textarea>
                                    </label>

                                    <div className="label-row upload">
                                        {Array.from(blogimageEdit).map((item,i)=>
                                        (
                                            <label htmlFor="#" key={i}>Blog Image
                                                <div className="uploadBtn">
                                                    <div className="circle">+</div>
                                                    Choose a file
                                                    <input type="file" filename="photos" multiple onChange={(e)=>{
                                                    setImage(e.target.files)}} className="input"/>
                                                    <img alt={blogimageEdit.name} src={URL.createObjectURL(item)} />
                                                </div>
                                            </label>
                                        ))}
                                        
                                        <label htmlFor="#">Blog Image
                                            <div className="uploadBtn">
                                                <div className="circle">+</div>
                                                Choose a file
                                                <input type="file" filename="photos" multiple onChange={(e)=>{
                                                setImage(e.target.files)}} className="input"/>
                                                <img alt={blogimage.name} src={`../assets/${blogimage[0].originalname}`} />
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
export default BlogView;