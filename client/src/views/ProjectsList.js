import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const ProjectsList = () => {
    axios.defaults.withCredentials = true;
    const user = JSON.parse(localStorage.getItem('user'));
    const [projects,setprojects] = useState([]);
    const token = localStorage.getItem('token');
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const getprojects = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/projects');
                setprojects(res.data.projects);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getprojects();
    },[]);

    const handleDelete = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/api/projects/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.data.message);
                navigate('/admindashboard');
            }
            else{
                alert(res.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }

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
                                    <Link to="/admindashboard"><div className="tab"><h3 className="heading">Overview</h3></div></Link>
                                    <Link to="/artisanList"><div className="tab"><h3 className="heading">View Artisans</h3></div></Link>
                                    <Link to="/userList"><div className="tab"><h3 className="heading">View Users</h3></div></Link>
                                    <Link to="/documentsList"><div className="tab"><h3 className="heading">View KYC Requests</h3></div></Link>
                                    <Link to="/projectsList"><div className="tab active"><h3 className="heading">View Adverts</h3></div></Link>
                                    <Link to="/categoryList"><div className="tab"><h3 className="heading">View Categories</h3></div></Link>
                                    <Link to="/blogList"><div className="tab"><h3 className="heading">View Blogs</h3></div></Link>
                                </div>
                            </div>

                            <div className="details-wrapper list projects">
                                <div className="table-header">
                                    <div className="table"><h3 className="heading">ID</h3></div>
                                    <div className="table"><h3 className="heading">Email</h3></div>
                                    <div className="table"><h3 className="heading">Project Name</h3></div>
                                    <div className="table"><h3 className="heading">Project Category</h3></div>
                                    <div className="table"><h3 className="heading">Verification</h3></div>
                                    <div className="table action-table"><h3 className="heading">Action</h3></div>
                                </div>

                                {projects.map((item,i)=>{
                                    return (
                                        <div className="table-body" key={i}>
                                            <div className="table"><p className="paragraph">{item._id}</p></div>
                                            <div className="table"><p className="paragraph">{`${item.email}`} </p></div>
                                            <div className="table"><p className="paragraph">{item.projectname}</p></div>
                                            <div className="table"><p className="paragraph">{item.category}</p></div>
                                            <div className="table"><p className="paragraph">{item.verified}</p></div>
                                            <div className="table action"><Link to={`/projectView/${item._id}`}><button>View</button></Link><Link to="/projectList"><button onClick={()=>handleDelete(item)}>Delete</button></Link></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
 
export default ProjectsList;