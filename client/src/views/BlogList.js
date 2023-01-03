import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const BlogList = () => {
    axios.defaults.withCredentials = true;
    const user = JSON.parse(localStorage.getItem('user'));
    const [blog,setblog] = useState([]);
    const [loading,setLoading] = useState(true);
    const [totalblog,settotalblog] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(()=>{
        const getblog = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/blog');
                settotalblog(res.data.total);
                setblog(res.data.blogs);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getblog();
    },[]);

    console.log(blog,totalblog)
    const handleDelete = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/api/blog/delete/${id}`,{
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
                                    <Link to="/projectsList"><div className="tab"><h3 className="heading">View Adverts</h3></div></Link>
                                    <Link to="/categoryList"><div className="tab"><h3 className="heading">View Categories</h3></div></Link>
                                    <Link to="/blogList"><div className="tab active"><h3 className="heading">View Blogs</h3></div></Link>
                                    <Link to="/blogadd"><button>Add Blog</button></Link>
                                </div>

                                
                            </div>

                            <div className="details-wrapper list cat">
                                <div className="table-header">
                                    <div className="table"><h3 className="heading">ID</h3></div>
                                    <div className="table"><h3 className="heading">Blog Name</h3></div>
                                    <div className="table"><h3 className="heading">Blog Image</h3></div>
                                    <div className="table"><h3 className="heading">Date</h3></div>
                                    <div className="table action-table"><h3 className="heading">Action</h3></div>
                                </div>

                                {blog.map((item,i)=>{
                                    return (
                                        <div className="table-body high-table" key={i}>
                                            <div className="table"><p className="paragraph">{item._id}</p></div>
                                            <div className="table"><p className="paragraph">{`${item.blogname}`} </p></div>
                                            <div className="table"><img src={`../assets/${item.blogimage[0].originalname}`} alt={item.title} style={{width:"100px",height:"6rem"}}/></div>
                                            <div className="table"><p className="paragraph">{item.createdAt}</p></div>
                                            <div className="table action"><Link to={`/blogview/${item._id}`}><button>View</button></Link><Link to="/blogList"><button onClick={()=>handleDelete(item)}>Delete</button></Link></div>
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
 
export default BlogList;