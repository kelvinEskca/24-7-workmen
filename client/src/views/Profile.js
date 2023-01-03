import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import axios from "axios";

const Profile = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    const [image,setImage] = useState([]);
    const [firstname,setfirstname] = useState('');
    const [phone,setphone] = useState('');
    const [lastname,setlastname] = useState('');
    const [username,setusername] = useState('');
    const [title,settitle] = useState('');
    const [postalcode,setpostalcode] = useState('');
    const [company,setcompany] = useState('');
    const [address,setaddress] = useState('');
    const [city,setcity] = useState('');
    const [category,setcategory] = useState('');
    const [country,setcountry] = useState('');
    const [aboutme,setaboutme] = useState('');
    
    const navigate = useNavigate();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("phone", phone);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("title", title);
    formData.append("postalcode", postalcode);
    formData.append("company", company);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("category", category);
    formData.append("country", country);
    formData.append("aboutme", aboutme);
    Array.from(image).forEach(item =>{
        formData.append("photos", item);
    })
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const id = userData._id;
        if(formData !== ''){
            try{
                const userUpdate = await axios.post(`http://localhost:5000/api/users/${id}`,
                formData,{ headers:{token:token} });
                if(userUpdate.status === 200){
                    alert("User Updated Successfully");
                    navigate('/account');
                }
                else{
                    alert("User not updated")
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
                                    {userData.image.length !== 0 ? (
                                        <div className="avatar">
                                            <img src={`../assets/${userData.image[0].originalname}`} alt={userData.image[0].originalname} />
                                        </div>
                                        
                                    ) : (
                                        <div className="avatar">
                                            <img src="../assets/icons8-user-80.png" alt="icons8-user-80" />
                                        </div>
                                    )}

                                    <div className="text">
                                        <h3 className="heading">{userData.username}</h3>
                                        <p className="paragraph">{userData.title}</p>
                                        <div className="location-row">
                                            <span><p className="paragraph">{userData.country}</p></span>
                                            <span><p className="paragraph">{userData.city}</p></span>
                                        </div>
                                    </div>

                                    <Link to="/account"><button>View Profile</button></Link>
                                </div>
                            </div>

                            <div className="box empty profile">
                                <h3 className="heading">Edit Profile</h3>
                                <form action="#" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="label-row upload">
                                        {Array.from(image).map((item,i)=>
                                        (
                                            <label htmlFor="#" key={i}>Profile Image
                                                <div className="uploadBtn">
                                                    <div className="circle">+</div>
                                                    Choose a file
                                                    <input type="file" filename="photos" multiple onChange={(e)=>{
                                                    setImage(e.target.files)}} className="input"/>
                                                    <img alt={image.name} src={URL.createObjectURL(item)} />
                                                </div>
                                            </label>
                                        ))}

                                        <label htmlFor="#">Profile Image
                                            <div className="uploadBtn">
                                                <div className="circle">+</div>
                                                Choose a file
                                                <input type="file" filename="photos" multiple onChange={(e)=>{
                                                setImage(e.target.files)}} className="input"/>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="label-row">
                                        <label htmlFor="#">First Name
                                            <input type="text" name="firstname" placeholder={userData.firstname} onChange={(e)=>{
                                                setfirstname(e.target.value)
                                            }}/>
                                        </label>

                                        <label htmlFor="#">Last Name
                                            <input type="text" name="lastname" placeholder={userData.lastname} onChange={(e)=>{
                                                setlastname(e.target.value)
                                            }}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Username
                                        <input type="text" name="username" placeholder={userData.username}  onChange={(e)=>{
                                            setusername(e.target.value)
                                        }}/>
                                    </label>

                                    <label htmlFor="#">Title
                                        <input type="text" name="title" onChange={(e)=>{
                                                settitle(e.target.value)
                                            }}/>
                                    </label>

                                    <div className="label-row">
                                        <label htmlFor="#">Company
                                            <input type="text" name="company" onChange={(e)=>{
                                                setcompany(e.target.value)
                                            }}/>
                                        </label>

                                        <label htmlFor="#">Address
                                            <input type="text" name="address" onChange={(e)=>{
                                                setaddress(e.target.value)
                                            }}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Phone Number
                                        <input type="text" name="phone" onChange={(e)=>{
                                                setphone(e.target.value)
                                            }} />
                                    </label>

                                    <label htmlFor="#">City
                                        <input type="text" name="city" onChange={(e)=>{
                                                setcity(e.target.value)
                                            }} />
                                    </label>

                                    <label htmlFor="#">Category
                                        <input type="text" name="category" onChange={(e)=>{
                                                setcategory(e.target.value)
                                            }}/>
                                    </label>

                                    <div className="label-row">
                                        <label htmlFor="#">Country
                                            <input type="text" name="country" onChange={(e)=>{
                                                setcountry(e.target.value)
                                            }}/>
                                        </label>

                                        <label htmlFor="#">Postal Code
                                            <input type="text" name="postalcode" onChange={(e)=>{
                                                setpostalcode(e.target.value)
                                            }}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">About Me
                                        <textarea name="aboutme" id="about" cols="30" rows="10" onChange={(e)=>{
                                                setaboutme(e.target.value)
                                            }}></textarea>
                                    </label>

                                    <label htmlFor="#">
                                        <button type="submit">Update Profile</button>
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
 
export default Profile;