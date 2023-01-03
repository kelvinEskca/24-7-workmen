import React,{useState,useEffect} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import EventCard from "../components/EventCard";
import {Link, useParams } from "react-router-dom";
const AdDetail = () => {
    const [list,setList] = useState([]);
    const [loading,setloading] = useState(true);
    const [wishlist,setWishlist] = useState([]);
    const [users,setUsers] = useState([]);
    const [artisans,setArtisans] = useState([]);
    const [moreArtisans,setMoreArtisans] = useState([]);
    const [filteredGallery,setfilteredGallery] = useState([]);
    const [image,setImage] = useState(false);
    const { id } = useParams();

    useEffect(()=>{
        const storedItems = localStorage.getItem('wishlist');
        if (storedItems) {
            setWishlist(JSON.parse(storedItems));
        }

        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/projects/ads/ad/${id}`);
                setList(res.data);
                setloading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();

        const getUser = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/users/artisans/${id}`);
                setUsers(res.data.users);
                setloading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getUser();

        const getArtisan = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/artisans/artisans/${id}`);
                setArtisans(res.data.users);
                setloading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getArtisan();

        const getMore = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/users/users/artisans');
                setMoreArtisans(res.data.users);
                setloading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getMore();
    },[id]);  
    
    const addToWishList = (item) => {
        localStorage.setItem('wishlist', JSON.stringify([...wishlist, item]));
        setWishlist([...wishlist, item]);
        setImage(image => !image);
    };

    const handleRemove = (index) => {
        const newWishlist = [...wishlist];
        newWishlist.splice(index);
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    useEffect(()=>{
        const filterArtisan = ()=>{
            let key;
            users.forEach((user)=>{
                key = user;
            })
            const newArtisans = moreArtisans.filter((item)=>{
                return item.city.toLowerCase().includes(key.city.toLowerCase()) && item._id !== key._id;
            });
            
            setfilteredGallery(newArtisans);
        }
        filterArtisan();
    },[moreArtisans,users])
    
    
    console.log(list,artisans,moreArtisans);

    if(loading) return<h1>Loading....</h1>
    return (
        <>
        <Header />
            <main className="main addetails">        
                <section className="section">
                    <div className="wrapper">
                        <div className="boxes">
                            {users.map((item,i)=>{
                               return <div className="image-gallery" key={i}>
                                    <img src={`../assets/${item.image[0].originalname}`} alt={item.firstname} />
                                    <div className="details-area">
                                        <div className="top">
                                            <h3 className="heading">{item.firstname + " " + item.lastname}</h3>
                                            {image === false ? (
                                                <img src="../assets/icons8-hand-drawn-heart.png" alt="icons8-hand-drawn-heart-30.png" onClick={()=>{addToWishList(item)}}/>
                                            ) : (
                                                <img src="../assets/icons8-hand-drawn-heart-30.png" alt="icons8-hand-drawn-heart-30.png" onClick={()=>{handleRemove(item)}}/>
                                            )}
                                            
                                        </div>

                                        <div className="center">
                                            <div className="icon">
                                                <img src="../assets/icons8-calendar-13-30.png" alt="icons8-calendar-13-30.png" />
                                                <p className="paragraph">{item.createdAt}</p>
                                            </div>

                                            <div className="icon">
                                                <img src="../assets/icons8-map-pin-30.png" alt="icons8-map-pin-30.png" />
                                                <p className="paragraph">{item.address + ", " + item.city}</p>
                                            </div>
                                        </div>

                                        <div className="details-holder">
                                            <div className="paragraph">{item.aboutme}</div>
                                        </div>

                                        <div className="bottom">
                                            <Link to={`/mailto:${item.email}`}><button>Email</button></Link>
                                            <Link to={`/tel:${item.phone}`}><button>Call</button></Link>
                                        </div>

                                        <div className="more">
                                            <h3 className="heading">Business Profile</h3>
                                            {artisans.map((item,i)=>{
                                                return <div className="profile-gllery" key={i}>
                                                <div className="column">
                                                    <h3 className="heading">Business Name</h3>
                                                    <p className="paragraph">{item.businessName}</p>
                                                </div>

                                                <div className="column">
                                                    <h3 className="headig">Registration Number</h3>
                                                    <p className="paragraph">{item.registrationNumber}</p>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Business Bio</h3>
                                                    <p className="paragraph">{item.bio}</p>
                                                </div>
                                                
                                                <div className="column">
                                                    <h3 className="heading">Featured Photos</h3>
                                                    <div className="featured">
                                                        {item.featuredPhotos.map((image,i)=>{
                                                            return <div className="reatured-photos" key={i}>
                                                                <img src={`../assets/${image.originalname}`}alt={image.originalname} />
                                                            </div>
                                                        })}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            })}
                                            
                                        </div>

                                        <section className="section event">
                                            <div className="wrapper">
                                                <h3 className="heading">User adverts</h3>
                                                <div className="boxes">
                                                    {list.map((item,i)=>{
                                                        return(
                                                        <EventCard  image={`../assets/${item.image[0].originalname}`} event={item.category} title={item.projectname} details={item.projectdescription} key={i}/>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </section>

                                        <div className="more">
                                            <h3 className="heading">Similar Artisans</h3>
                                            <div className="more-gallery">
                                                {filteredGallery.map((item,i)=>{
                                                    return (
                                                    <Link to={`/addetails/${item._id}`} key={i}>
                                                        <div className="galleryImage">
                                                            <img src={`../assets/${item.originalname}`} alt={item.originalname} />
                                                        </div>
                                                    </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </section>
            </main>
        <Footer />
        </>
    );
}
 
export default AdDetail;