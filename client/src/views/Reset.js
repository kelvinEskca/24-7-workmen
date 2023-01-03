import { Link } from "react-router-dom";
const Reset = () => {
    return (
        <section className="section authForm">
            <div className="wrapper">
                <div className="boxes">
                    <div className="box">
                        <img src="../assets/pexels-pixabay-262488.jpg" alt="pexels-pixabay-262488" />
                    </div>
                    <div className="box">
                        <h3 className="heading">Reset password</h3>
                        <p className="paragraph">If you forgot your password, don't worry! we'll email you instructions to reset your password. </p>

                        <form className="form">
                            <label htmlFor="#">Email
                                <input type="email" name="email" id="email" />
                            </label>

                            <label htmlFor="#" className="reset">
                                <button>Send Reset Link</button>
                                <Link to="/login">Back to Login</Link>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section> 
    );
}
 
export default Reset;