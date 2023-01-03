import React,{useState} from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import axios from "axios";
const Contact = () => {
    const [Fname,setFname] = useState('');
    const [Lname,setLname]= useState('');
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');

    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(Fname !== "" || Lname !== "" || email !== "" || message !== ""){
            try{
                console.log(Fname,Lname,email,message);
                axios.post('http://localhost:5000/api/contact',{
                    fname:Fname,
                    lname:Lname,
                    email:email,
                    message:message
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
        <>
            <Header />
            <main className="main">
                <Hero heading={'Contact Us'} paragraph={'Home > Contact Us'} />

                <section className="section contact-info">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Contact Information</h3>
                                <div className="contact-boxes">
                                    <div className="contact-box">
                                        <h3 className="heading">Location:</h3>
                                        <p className="paragraph">3187 Francis Mine Redding, CA 96001</p>
                                    </div>

                                    <div className="contact-box">
                                        <h3 className="heading">Email:</h3>
                                        <Link to='mailto:support@mail.com'>support@mail.com</Link>
                                    </div>

                                    <div className="contact-box">
                                        <h3 className="heading">Phone:</h3>
                                        <Link to='tel:+555-22-222'>555-22-222</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="box">
                                <h3 className="heading">Contact Form</h3>
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <div className="label-row">
                                        <label htmlFor="#">
                                            <input type="text" placeholder="First Name" onChange={(e)=>{setFname(e.target.value)}} />
                                        </label>

                                        <label htmlFor="#">
                                            <input type="text" placeholder="Last Name" onChange={(e)=>{setLname(e.target.value)}}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">
                                        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                                    </label>

                                    <label htmlFor="#">
                                        <textarea name="message" id="message" cols="30" rows="10" placeholder="Message" onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                                    </label>

                                    <label htmlFor="#">
                                        <button>Send Message</button>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section areas">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">California</h3>
                                <p className="paragraph">4585 Half and Half Drive Fresno, CA 93711</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Finland</h3>
                                <p className="paragraph">Kerkkolankatu 93 21207 RAISIO</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Germany</h3>
                                <p className="paragraph">Rudower Chaussee 23 96049 Bamberg</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default Contact;