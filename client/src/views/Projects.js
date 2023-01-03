import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const Projects = () => {
    axios.defaults.withCredentials = true;
    const user = JSON.parse(localStorage.getItem('user'));
    const [projectname,setprojectname] = useState('');
    const [projects,setprojects] = useState([]);
    const [adverts,setadverts] = useState([]);
    const token = localStorage.getItem('token');
    const [category,setcategory] = useState('');
    const [projectdescription,setprojectdescription] = useState('');
    const [startdate,setstartdate] = useState('');
    const [enddate,setenddate] = useState('');
    const [loading,setLoading] = useState(true);
    const [location,setlocation] = useState('');
    const [image,setImage] = useState([]);
    const [kyc,setkyc] = useState([]);
    const navigate = useNavigate();
    const id = user._id;
    const email = user._email;

    const formData = new FormData();
    formData.append("location", location);
    formData.append("enddate", enddate);
    formData.append("userId",user._id);
    formData.append("email",user.email);
    formData.append("phone",user.phone);
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

    useEffect(()=>{
        const getprojects = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/projects/ads/${id}`,{headers:{token:token}});
                setprojects(res.data.project);
                setadverts(res.data.total);
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


    },[token,id,email]);

    if(loading) return <h1>Loading</h1>;
    return (

        <>
            <DashHeader />
            <main className="main dash-main">
                <section className="section dash-account">
                    <div className="wrapper">
                        <div className="boxes projects-boxes">
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
                            </div>

                            <div className="tabs-wrapper">
                                <div className="tabs">
                                    <Link to='/account'><div className="tab"><h3 className="heading">Overview</h3></div></Link>
                                    <Link to="/projects"><div className="tab active"><h3 className="heading">Adverts</h3></div></Link>
                                    <Link to="/documents"><div className="tab"><h3 className="heading">KYC Verification</h3></div></Link>
                                    <Link to="/business"><div className="tab"><h3 className="heading">Business Information</h3></div></Link>
                                    <Link to="/profile"><button>Edit Profile</button></Link>
                                </div>

                                
                            </div>

                            <div className="details-wrapper list projects">
                                <div className="table-header">
                                    <div className="table"><h3 className="heading">ID</h3></div>
                                    <div className="table"><h3 className="heading">Email</h3></div>
                                    <div className="table"><h3 className="heading">Project Name</h3></div>
                                    <div className="table"><h3 className="heading">Project Category</h3></div>
                                    <div className="table"><h3 className="heading">Verification</h3></div>
                                </div>

                                {projects.map((item,i)=>{
                                    return (
                                        <div className="table-body" key={i}>
                                            <div className="table"><p className="paragraph">{item._id}</p></div>
                                            <div className="table"><p className="paragraph">{`${item.email}`} </p></div>
                                            <div className="table"><p className="paragraph">{item.projectname}</p></div>
                                            <div className="table"><p className="paragraph">{item.category}</p></div>
                                            <div className="table"><p className="paragraph">{item.verified}</p></div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="box empty profile">
                                <h3 className="heading">Upload Advert</h3>
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
                                            <input type="text" onChange={(e)=>{setcategory(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">Project Name
                                            <input type="text" onChange={(e)=>{setprojectname(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Description
                                        <textarea name="desc" id="desc" cols="30" rows="10" onChange={(e)=>{setprojectdescription(e.target.value)}}></textarea>
                                    </label>

                                    <div className="label-row">
                                        <label htmlFor="#">Start Date
                                            <input type="date" onChange={(e)=>{setstartdate(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">End Date
                                            <input type="date" onChange={(e)=>{setenddate(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Location
                                        <input type="text" onChange={(e)=>{setlocation(e.target.value)}}/>
                                    </label>

                                    <label htmlFor="#">
                                        <button>Submit</button>
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
 
export default Projects;