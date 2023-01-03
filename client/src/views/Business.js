import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const Business = () => {
    axios.defaults.withCredentials = true;
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [image,setImage] = useState([]);
    const [Kyc,setkyc] = useState([]);
    const [adverts,setadverts] = useState([]);
    const [businessname,setbusinessname] = useState('');
    const [registrationNumber,setregistrationNumber] = useState('');
    const [bio,setbio] = useState('');
    const [loading,setLoading] = useState(true);
    const id = userData._id;
    const email = userData._email;

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const formData = new FormData();
    formData.append("businessname", businessname);
    formData.append("email", userData.email);
    formData.append("userId", userData._id);
    formData.append("registrationNumber", registrationNumber);
    formData.append("bio", bio);
    Array.from(image).forEach(item =>{
        formData.append("photos", item);
    })

    useEffect(()=>{
        const getprojects = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/projects/ads/${id}`,{headers:{token:token}});
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(businessname !== "" || registrationNumber !== "" || bio !== "" || image !== "" ){
            try{
                const busUpdate = await axios.post('http://localhost:5000/api/artisans',
                formData);
                if(busUpdate){
                    localStorage.setItem("Projects",JSON.stringify(busUpdate.data));
                    alert("Business Profile Uploded Successfully");
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
            alert("Please Ensure all fields are filled");
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

                                {user.isArtisan ? (
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
                                            <h3 className="heading">{Kyc}</h3>
                                            <p className="paragraph">KYC</p>
                                        </div>
                                    </div>
                                ):("")}
                            </div>

                            
                            {user.isArtisan ? 
                            (   
                                <>
                                <div className="tabs-wrapper">
                                    <div className="tabs">
                                        <Link to="/account"><div className="tab"><h3 className="heading">Overview</h3></div></Link>
                                        <Link to="/projects"><div className="tab"><h3 className="heading">Adverts</h3></div></Link>
                                        <Link to="/documents"><div className="tab"><h3 className="heading">KYC</h3></div></Link>
                                        <Link to="/business"><div className="tab active"><h3 className="heading">Business Information</h3></div></Link>
                                        <Link to="/profile"><button>Edit Profile</button></Link>
                                    </div>
                                </div>

                                <div className="details-wrapper">
                                    <div className="box empty profile">
                                        <h3 className="heading">Add Business Information</h3>
                                        <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
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

                                                <label htmlFor="#">Featured Image
                                                    <div className="uploadBtn">
                                                        <div className="circle">+</div>
                                                        Choose a file
                                                        <input type="file" filename="photos" multiple onChange={(e)=>{
                                                        setImage(e.target.files)}} className="input"/>
                                                    </div>
                                                </label>
                                            </div>

                                            <div className="label-row">
                                                <label htmlFor="#">Business Name
                                                    <input type="text" name="busname" onChange={(e)=>{
                                                        setbusinessname(e.target.value)
                                                    }}/>
                                                </label>

                                                <label htmlFor="#">Registration Number
                                                    <input type="text" name="regnumber" onChange={(e)=>{
                                                        setregistrationNumber(e.target.value)
                                                    }}/>
                                                </label>
                                            </div>

                                            <label htmlFor="#">Biography 
                                                <textarea name="bio" id="bio" cols="30" rows="10" onChange={(e)=>{
                                                        setbio(e.target.value)
                                                    }}></textarea>
                                            </label>

                                            <label htmlFor="#">
                                                <button>Update Business</button>
                                            </label>
                                        </form>
                                    </div>
                                </div>
                                </>
                            ):(
                                <>
                                    <div className="tabs-wrapper">
                                        <div className="tabs">
                                        <Link to="/account"><div className="tab active"><h3 className="heading">Overview</h3></div></Link>
                                        </div>

                                        <Link to="/profile"><button>Edit Profile</button></Link>
                                    </div>

                                    <div className="details-wrapper">
                                        <div className="box empty">
                                            <div className="empty-row">
                                                <h3 className="heading">Firstname:</h3>
                                                <p className="paragraph">{user.firstname}</p>
                                            </div>
                                            <div className="empty-row">
                                                <h3 className="heading">Lastname:</h3>
                                                <p className="paragraph">{user.lastname}</p>
                                            </div>
                                            <div className="empty-row">
                                                <h3 className="heading">Address:</h3>
                                                <p className="paragraph">{user.address}</p>
                                            </div>
                                            <div className="empty-row">
                                                <h3 className="heading">City</h3>
                                                <p className="paragraph">{user.city}</p>
                                            </div>
                                            <div className="empty-row">
                                                <h3 className="heading">Country</h3>
                                                <p className="paragraph">{user.country}</p>
                                            </div>
                                        </div>
                                        <div className="box empty">
                                            <h3 className="heading">About Me</h3>
                                            <p className="paragraph">{user.aboutme}</p>
                                        </div>
                                    </div>
                                
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
 
export default Business;