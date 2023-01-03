import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const Documents = () => {
    axios.defaults.withCredentials = true;
    const [idname,setidname] = useState('');
    const [idnumber,setidnumber] = useState('');
    const [image,setImage] = useState([]);
    const [Kyc,setkyc] = useState([]);
    const [adverts,setadverts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const kyc = JSON.parse(localStorage.getItem('KYC'));
    const [loading,setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const id = user._id;
    const email = user._email;

    const formData = new FormData();
    formData.append("idname", idname);
    formData.append("idnumber", idnumber);
    formData.append("userId",user._id);
    formData.append("email",user.email);
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

    const handleform = async (e)=>{
        e.preventDefault();
        if(idnumber !== "" || idname !== ""){
            try{
                const kycSubmit = await axios.post("http://localhost:5000/api/kyc",formData)
                if(kycSubmit){
                    localStorage.setItem("KYC",JSON.stringify(kycSubmit.data));
                    alert(kycSubmit.data.message);
                    navigate('/account');
                }
                else{
                    alert('Kyc Request Failed');
                    navigate('/documents');
                }
                
            }
            catch(err){
                console.log(err);
                navigate('/documents');
            }
        }
        else{
            alert('Ensure all inputs are filled');
            navigate('/documents');
        }
    }

    if(loading) return <h1>Loading</h1>;

    return (

        <>
            <DashHeader/>
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
                            </div>

                            <div className="tabs-wrapper">
                                <div className="tabs">
                                    <Link to='/account'><div className="tab"><h3 className="heading">Overview</h3></div></Link>
                                    <Link to="/projects"><div className="tab"><h3 className="heading">Adverts</h3></div></Link>
                                    <Link to="/documents"><div className="tab active"><h3 className="heading">KYC Verification</h3></div></Link>
                                    <Link to="/business"><div className="tab"><h3 className="heading">Business Information</h3></div></Link>
                                    <Link to="/profile"><button>Edit Profile</button></Link>
                                </div>
                            </div>

                            {kyc ? 
                            (
                                <div className="box empty profile">
                                    <h3 className="heading">KYC Data</h3>
                                    <form action="#" className="form">
                                        <div className="label-row upload">
                                            <label htmlFor="#">KYC Image
                                                <img src={`../assets/${kyc.data.image[0].originalname}`} alt={kyc.data.image[0].originalname} style={{width:"15rem",height:"10rem",marginTop:".4rem"}}/>
                                            </label>
                                        </div>

                                        <div className="label-row">
                                            <label htmlFor="#">Name on ID
                                                <input type="text" value={kyc.data.idname} onChange={(e)=>{setidname(e.target.value)}}/>
                                            </label>

                                            <label htmlFor="#">Number on ID
                                                <input type="text" value={kyc.data.idnumber} onChange={(e)=>{setidnumber(e.target.value)}}/>
                                            </label>
                                        </div>

                                        <label htmlFor="#">
                                            <button disabled>{kyc.data.status}</button>
                                        </label>
                                    </form>
                                </div>
                            ) : 
                            (
                                <div className="box empty profile">
                                    <h3 className="heading">Submit KYC</h3>
                                    <form action="#" className="form" onSubmit={handleform} encType="multipart/form-data">
                                        <div className="label-row upload">
                                            {Array.from(image).map((item,i)=>
                                            (
                                                <label htmlFor="#" key={i}>KYC Image
                                                    <div className="uploadBtn">
                                                        <div className="circle">+</div>
                                                        Choose a file
                                                        <input type="file" filename="photos" multiple onChange={(e)=>{
                                                        setImage(e.target.files)}} className="input"/>
                                                        <img alt={image.name} src={URL.createObjectURL(item)} />
                                                    </div>
                                                </label>
                                            ))}

                                            <label htmlFor="#">KYC Image
                                                <div className="uploadBtn">
                                                    <div className="circle">+</div>
                                                    Choose a file
                                                    <input type="file" filename="photos" multiple onChange={(e)=>{
                                                    setImage(e.target.files)}} className="input"/>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="label-row">
                                            <label htmlFor="#">Name on ID
                                                <input type="text" onChange={(e)=>{setidname(e.target.value)}}/>
                                            </label>

                                            <label htmlFor="#">Number on ID
                                                <input type="text" onChange={(e)=>{setidnumber(e.target.value)}}/>
                                            </label>
                                        </div>

                                        <label htmlFor="#">
                                            <button>Submit</button>
                                        </label>
                                    </form>
                                </div>
                            ) }
                            
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
 
export default Documents;