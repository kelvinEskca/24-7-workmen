import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import { useParams } from 'react-router-dom';
const ProjectView = () => {
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem('user'));

    const token = localStorage.getItem('token');
    const [projectname,setprojectname] = useState('');
    const [category,setcategory] = useState('');
    const [projectdescription,setprojectdescription] = useState('');
    const [startdate,setstartdate] = useState('');
    const [enddate,setenddate] = useState('');
    const [location,setlocation] = useState('');
    const [image,setImage] = useState([]);

    const navigate = useNavigate();
    const formData = new FormData();
    formData.append("location", location);
    formData.append("enddate", enddate);
    formData.append("userId",list._id);
    formData.append("email",list.email);
    formData.append("startdate",startdate);
    formData.append("projectdescription",projectdescription);
    formData.append("category",category);
    formData.append("projectname",projectname);
    Array.from(image).forEach(item =>{
        formData.append("photos", item);
    })


    const handleform = async (e)=>{
        e.preventDefault();
        if(projectname !== "" || category !== "" || projectdescription !== "" || startdate !== "" || enddate !== "" || location !== "" ){
            try{
                const userProject = await axios.post('http://localhost:5000/api/projects',formData)
                if(userProject){
                    localStorage.setItem("Projects",JSON.stringify(userProject.data));
                    alert("Project Added Successfully");
                    navigate('/account');
                }
                else{
                    alert('Project Upload Failed');
                    navigate('/projects');
                }
            }
            catch(err){
                console.log(err.message);
            }
        }
        else{
            alert('Please Ensure all fields are filled');
        }
    }

    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/projects/${id}`,{headers:{token:token}});
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
                                <h3 className="heading">Adverts</h3>
                                <form action="#" className="form" onSubmit={handleform} encType="multipart/form-data">
                                    <div className="label-row">
                                        {Array.from(image).map((item,i)=>
                                        (
                                            <div className="uploadBtn" key={i}>
                                                <div className="circle">+</div>
                                                Choose a file
                                                <input type="file" filename="photos" multiple onChange={(e)=>{
                                                setImage(e.target.files)}} className="input"/>
                                                <img alt={image.name} src={URL.createObjectURL(item)} />
                                            </div>
                                        ))}

                                        <label htmlFor="#">Project Image
                                            <div className="uploadBtn">
                                                <div className="circle">+</div>
                                                Choose a file
                                                <input type="file" filename="photos" multiple onChange={(e)=>{
                                                setImage(e.target.files)}} className="input"/>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="label-row">
                                        <label htmlFor="#">Category
                                            <input type="text" value={list.category} onChange={(e)=>{setcategory(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">Project Name
                                            <input type="text" value={list.projectname} onChange={(e)=>{setprojectname(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Description
                                        <textarea name="desc" value={list.projectdescription} id="desc" cols="30" rows="10" onChange={(e)=>{setprojectdescription(e.target.value)}}></textarea>
                                    </label>

                                    <div className="label-row">
                                        <label htmlFor="#">Start Date
                                            <input type="date" value={list.startdate} onChange={(e)=>{setstartdate(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">End Date
                                            <input type="date" value={list.enddate} onChange={(e)=>{setenddate(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Location
                                        <input type="text" value={list.location} onChange={(e)=>{setlocation(e.target.value)}}/>
                                    </label>

                                    <label htmlFor="#">
                                        <button>Edit Project</button>
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
export default ProjectView;