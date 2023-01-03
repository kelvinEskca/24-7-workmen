import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const loginUser = await axios.post('http://localhost:5000/api/auth/login',{
                email:email,
                password:password
            });
            if(loginUser.status === 200){
                localStorage.setItem("token", loginUser.data.accessToken);
                localStorage.setItem("user",JSON.stringify(loginUser.data));
                if(loginUser.data.isAdmin === false){
                    navigate('/account');
                }
                else{
                    navigate('/admindashboard');
                }
            }
            else{
                console.log(loginUser.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <section className="section authForm">
            <div className="wrapper">
                <div className="boxes">
                    <div className="box">
                        <img src="../assets/pexels-pixabay-262488.jpg" alt="pexels-pixabay-262488" />
                    </div>
                    <div className="box">
                        <h3 className="heading">Login to Account</h3>
                        <p className="paragraph">Please sign-in to your account and start the adventure.</p>

                        <form className="form" onSubmit={handleSubmit}>
                            <label htmlFor="#">Email
                                <input type="email" name="email" id="email" onChange={(e)=>{
                                    setEmail(e.target.value);
                                }}/>
                            </label>

                            <label htmlFor="#">Password
                                <input type="password" name="password" id="password" onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}/>
                            </label>

                            <label htmlFor="#" className="label-row">
                                <div className="check-row">
                                    <input type="checkbox" name="check" id="check" />
                                    <p className="paragraph">Remember Me</p>
                                </div>

                                <Link to="/reset">Forgot Password?</Link>
                            </label>

                            <label htmlFor="#" className="label-row">
                                <p className="paragraph">Don't Have an Account?</p>
                                <Link to="/register">Sign Up</Link>
                            </label>

                            <label htmlFor="#">
                                <button type="submit">Login to account</button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section> 
    );
}
 
export default Login;