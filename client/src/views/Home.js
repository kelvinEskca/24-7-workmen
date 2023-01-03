import React,{useEffect,useState} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import Newsletter from "../components/Newsletter";
import EventCard from "../components/EventCard";
import MostCard from "../components/MostCard";
import TopCard from "../components/TopCard";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
    axios.defaults.withCredentials = true;
    const [category,setcategory] = useState([]);
    const [projects,setprojects] = useState([]);
    const [users,setusers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [totalcategory,settotalcategory] = useState('');
    const [filtered,setfiltered] = useState('');
    const [categoryList,setcategoryList] = useState([]);

    useEffect(()=>{
        const getcategory = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/category');
                settotalcategory(res.data.total);
                setLoading(false);
                setcategory(res.data.category);
            }
            catch(err){
                console.log(err);
            }
        }
        getcategory();

        const getprojects = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/projects');
                setprojects(res.data.projects);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getprojects();

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

    console.log(totalcategory,category);

    useEffect(()=>{
        const filterCategories = () =>{        
            for (const element of category) {
                setcategoryList(element.categoryname)
            }
        }
        filterCategories()
    },[category])
    console.log(categoryList);

    if(loading) return <h1>Loading</h1>;
    return (
        <>
            <Header />
            <main className="main">
                <section className="section hero-main">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Need a quick fix? </h3>
                                <h3 className="heading">Find Handy Men close to you without stress</h3>
                                
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
                        </div>
                    </div>
                </section>

                <section className="section about service-listing">
                    <div className="wrapper">
                        <TopCard heading={'What we offer'} paragraph={'Service Provider meets service'} />
                        <div className="boxes">
                            <div className="box">
                                <div className="top">
                                    <h3 className="heading">For Users</h3>
                                    <p className="paragraph">Search for any domestic service, and we'll find registered providers closest to you.</p>
                                    <p className="paragraph">You pick one of the listed providers, and after they accept your service request, you can contact them to discuss further.</p>
                                    <p className="paragraph">You connect and communicate with the service provider</p>
                                </div>
                                <img src="../assets/blog_10-710x480.jpg" alt="blog" />
                            </div>

                            <div className="box">
                                <img src="../assets/pexels-pixabay-30170.jpg" alt="blog" />
                                <div className="top">
                                    <h3 className="heading">For Handymen</h3>
                                    <p className="paragraph">Register as a 24/7 workman provider, and submit all required information and documents</p>
                                    <p className="paragraph">24/7 workman would list you as a provider for the service you offer and users around you can request your service</p>
                                    <p className="paragraph">Accept users' requests and proceed with completing their jobs and getting paid!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section categories">
                    <div className="wrapper">
                        <div className="boxes">
                            {category.map((item,i)=>{
                                return (
                                    
                                    <Card image={`../assets/${item.image[0].originalname}`} heading={item.categoryname} paragraph={categoryList._id === item.categoryname ? (categoryList.count + " Workmen " ) : ("0 Workmen")} key={i}/>
                                    
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="section event">
                    <div className="wrapper">
                        <h3 className="heading">Trending ads</h3>
                        <div className="line"></div>
                        <div className="boxes">
                            {projects.map((item,i)=>{
                                return(
                                <EventCard  image={`../assets/${item.image[0].originalname}`} event={item.category} title={item.projectname} details={item.projectdescription} key={i}/>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="section how-section">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <div className="circle">
                                    <img src="../assets/feature_1.png" alt="icon" />
                                </div>
                                <div className="text">
                                    <h3 className="heading">Find help</h3>
                                    <p className="paragraph">Find professionals for your domestic needs quickly, and without hassles.</p>
                                </div>
                            </div>

                            <div className="box">
                                <div className="circle">
                                    <img src="../assets/feature_2.png" alt="icon" />
                                </div>
                                <div className="text">
                                    <h3 className="heading">Find customers</h3>
                                    <p className="paragraph">Have a skill? Provide services and expand customer base</p>
                                </div>
                            </div>

                            <div className="box">
                                <div className="circle">
                                    <img src="../assets/feature_3.png" alt="icon" />
                                </div>
                                <div className="text">
                                    <h3 className="heading">Set your schedule</h3>
                                    <p className="paragraph">Get your essesntial needs provided immediately or on a scheduled date</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section most">
                    <div className="wrapper">
                        <h3 className="heading">Most Searched Workmen</h3>
                        <p className="paragraph">Take a peak at our most active worken</p>
                        <div className="line"></div>
                        <div className="boxes">
                            {category.map((item,i)=>{
                                return (
                                    <MostCard image={`../assets/${item.image[0].originalname}`} heading={item.categoryname} paragraph={24} key={i}/>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <Newsletter />
            </main>
            <Footer />
        </>
    );
}
 
export default Home;