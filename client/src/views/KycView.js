import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";
import { useParams } from 'react-router-dom';
const KycView = () => {
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [idname,setidname] = useState('');
    const [idnumber,setidnumber] = useState('');
    const [image,setImage] = useState([]);
    const formData = new FormData();
    formData.append("idname", idname);
    formData.append("idnumber", idnumber);
    formData.append("userId",list._id);
    formData.append("email",list.email);
    Array.from(image).forEach(item =>{
        formData.append("photos", item);
    })
   
    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/kyc/${id}`,{headers:{token:token}});
                setList(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[id,token]);

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
                                            <input type="text" value={list.idname} onChange={(e)=>{setidname(e.target.value)}}/>
                                        </label>

                                        <label htmlFor="#">Number on ID
                                            <input type="text" value={list.idnumber} onChange={(e)=>{setidnumber(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">
                                        <button>Edit Kyc</button>
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
export default KycView;