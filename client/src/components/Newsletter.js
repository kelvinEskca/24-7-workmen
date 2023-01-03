import React,{useState} from "react";
import axios from "axios";
const NewsLetter = () => {
    const [email,setEmail] = useState();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(email !== ''){
            try{
                axios.post('http://localhost:5000/api/news',{
                    email:email
                });

            }
            catch(err){
                console.log(err);
            }
        }
        else{
            alert('Please ensure all fields are filled');
        }
    }
    return (
        <section className="section newsletter">
            <div className="wrapper">
                <div className="boxes">
                    <div className="box">
                        <span>Subscribe</span>
                        <h3 className="heading">Sign up for Newsletter!</h3>
                    </div>

                    <div className="box">
                        <form className="form" onSubmit={handleSubmit}>
                            <label htmlFor="#">
                                <input type="email" placeholder="Enter Your Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </label>
                            <button className="subscribe" style={{background:'transparent'}}>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default NewsLetter;