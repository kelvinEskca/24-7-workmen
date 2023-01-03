import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () => {
    axios.defaults.withCredentials = true;
    const [username,setUsername] = useState('');
    const [choice,setChoice] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(email === ''  || username === ''  || password === ''){
            alert('Please ensure all fields are filled');
        }
        else if(password.length <= 4){
            alert('Please make sure passwords is greater than 4 characters');
        }
        else{
            try{
                const userSubmit = await axios.post('http://localhost:5000/api/auth/register',{
                    email:email,
                    username:username,
                    password:password,
                });
                console.log(userSubmit);
                navigate('/login');
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const handleSubmitWorkman = async (e) =>{
        e.preventDefault();
        if(email === ''  || username === ''  || password === ''){
            alert('Please ensure all fields are filled');
        }
        else if(password.length <= 4){
            alert('Please make sure passwords is greater than 4 characters');
        }
        else{
            try{
                const userSubmit = await axios.post('http://localhost:5000/api/auth/register',{
                    email:email,
                    username:username,
                    password:password,
                    isArtisan:true,
                });
                console.log(userSubmit);
                navigate('/login');
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const togglePersonal = ()=>{
        setChoice(true);
    }
    const toggleArtisan = () =>{
        setChoice(false);
    }

    return (
        <>
        <section className="section choice">
            <div className="wrapper">
                <div className="boxes">
                    <div className="button-row">
                        <button className={`button ${choice ? "picked" : ""}`} onClick={togglePersonal}>User</button>
                        <button className={`button ${choice ? "" : "picked"}`} onClick={toggleArtisan}>Workman</button>
                    </div>
                </div>
            </div>
        </section>
        {choice ? (
            <section className="section authForm">
                <div className="wrapper">
                    <div className="boxes">
                        <div className="box">
                            <img src="../assets/pexels-ono-kosuki-5973969.jpg" alt="pexels-magda-ehlers-1586951" />
                        </div>
                        <div className="box">
                            <h3 className="heading">Create A User Account</h3>
                            <p className="paragraph">Use your email to continue with 24/7 Workmen (it's free)! </p>
        
                            <form className="form" onSubmit={handleSubmit}>
                                <label htmlFor="#">Username
                                    <input type="text" name="username" id="username" onChange={(e)=>{
                                        setUsername(e.target.value);
                                    }} />
                                </label>
        
                                <label htmlFor="#">Email
                                    <input type="email" name="email" id="email" onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }} />
                                </label>
        
                                <label htmlFor="#">Password
                                    <input type="password" name="password" id="password" onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }}/>
                                </label>
        
                                <label htmlFor="#" className="label-row">
                                    <p className="paragraph">Have an Account?</p>
                                    <Link to="/login">Login</Link>
                                </label>
        
                                <label htmlFor="#" className="label-row">
                                    <div className="check-row check-wider">
                                        <input type="checkbox" name="check" id="check" />
                                        <p className="paragraph">I agree to <Link to='/privacy'>privacy policy</Link></p>
                                    </div>
                                </label>
        
                                <label htmlFor="#">
                                    <button type="submit">Sign Up</button>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </section> 
        )
        : 
        (
            <section className="section authForm">
                <div className="wrapper">
                    <div className="boxes">
                        <div className="box">
                            <img src="../assets/pexels-ono-kosuki-59739.jpg" alt="pexels-magda-ehlers-1586951" />
                        </div>
                        <div className="box">
                            <h3 className="heading">Create A Workman Account</h3>
                            <p className="paragraph">Use your email to continue with 24/7 Workmen (it's free)! </p>

                            <form className="form" onSubmit={handleSubmitWorkman}>
                                <label htmlFor="#">Username
                                    <input type="text" name="username" id="username" onChange={(e)=>{
                                        setUsername(e.target.value);
                                    }} />
                                </label>

                                <label htmlFor="#">Email
                                    <input type="email" name="email" id="email" onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }} />
                                </label>

                                <label htmlFor="#">Password
                                    <input type="password" name="password" id="password" onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }}/>
                                </label>

                                <label htmlFor="#" className="label-row">
                                    <p className="paragraph">Have an Account?</p>
                                    <Link to="/login">Login</Link>
                                </label>

                                <label htmlFor="#" className="label-row">
                                    <div className="check-row check-wider">
                                        <input type="checkbox" name="check" id="check" />
                                        <p className="paragraph">I agree to <Link to='/privacy'>privacy policy</Link></p>
                                    </div>
                                </label>

                                <label htmlFor="#">
                                    <button type="submit">Sign Up</button>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </section> 
        )}
        
        </>

        
    );
}
 
export default Register;