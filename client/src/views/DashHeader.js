import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const DashHeader = () => {
    axios.defaults.withCredentials = true;
    const auth = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [category,setcategory] = useState([]);
    const [filtered,setfiltered] = useState('');
    const [loading,setLoading] = useState(true);
    const [users,setusers] = useState([]);
    const navigate = useNavigate();
    const logout = () => {
        if(auth){
            localStorage.clear();
            navigate('/login');
        }
        else{
            alert('User not logged in!!');
        }
    }

    useEffect(()=>{
        const getcategory = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/category');
                setLoading(false);
                setcategory(res.data.category);
            }
            catch(err){
                console.log(err);
            }
        }
        getcategory();

        const getusers = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/artisans');
                setusers(res.data.users);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getusers();
    },[]);

    const search = async (e) => {
        e.preventDefault();
        const key = e.target.value;
        const newFilter = users.filter((value)=>{
            return value.category.toLowerCase().includes(key.toLowerCase());
        });

        if(key === ""){
            setfiltered([]);
        }
        else{
            setfiltered(newFilter);
        }
    };

    console.log(category)

    if(loading) return <h1>Loading</h1>;
    return (
        <header className="dash-header">
            <nav className="dash-mobile">
                <div className="left">
                    <img src="../assets/icons8-menu-50.png" alt="menu" className="menu"/>
                    <img src="../assets/logo.jpeg" alt="logo" className="logo"/>
                </div>

                <div className="box">
                    <form className="form search-form">
                        <label htmlFor="#">
                            <input type="text" name="search" placeholder="Search for artisans" onChange={search} autoComplete="off"/>
                        </label>
                    </form>
                
                    {filtered.length !== 0 && (
                        <div className="search-result">
                            {filtered.slice(0,10).map((item,i)=>{
                                return (
                                    <Link to={`/${item._id}`} key={i}>
                                        <div className="artisan-wrapper">
                                            <div className="left">
                                                <div className="image">
                                                    <img src={`../assets/${item.image[0].originalname}`} alt={item.firstname} />
                                                </div>

                                                <div className="text">
                                                    <p className="paragraph">{item.firstname + " " + item.lastname}</p>
                                                    <h3 className="heading">{item.category}</h3>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <p className="paragraph">{item.city}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>

                <div className={`right ${user.isAdmin ? ("adminright") : ("")}`}>
                    {user.isAdmin ? (
                        user.image.length !== 0 ? (
                            <Link to='/admindashboard'><div className="avatar">
                                <img src={`../assets/${user.image[0].originalname}`} alt={user.image[0].originalname} />
                            </div></Link>
                        ) : (
                            <div className="avatar">
                                <img src="../assets/icons8-user-80.png" alt="icons8-user-80" />
                            </div>
                        )
                        
                    ) : (
                        <>
                            <Link to='/notification'><div className="small-circle">
                                <img src="../assets/icons8-notification-50.png" alt="notification" />
                            </div></Link>

                            <Link to='/saved'><div className="small-circle">
                                <img src="../assets/icons8-filled-bookmark-ribbon-50.png" alt="bookmark" />
                            </div></Link>

                            {user.image.length === 0 ? (
                                <Link to='/account'><div className="avatar">
                                    <img src="../assets/icons8-user-80.png" alt="icons8-user-80" />
                                </div></Link>
                            ) : (
                                <Link to='/account'><div className="avatar">
                                    <img src={`../assets/${user.image[0].originalname}`} alt={user.image[0].originalname} />
                                </div></Link>
                            )}
                        </>
                    )}
                    
                    {user ? (<h3 className="heading" onClick={logout}>Logout</h3>) : (<h3 className="heading" onClick={logout}>Logout</h3>)}
                    
                </div>
            </nav>
        </header>
    );
}
 
export default DashHeader;