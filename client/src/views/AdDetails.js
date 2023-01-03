import React,{useState,useEffect} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const AdDetails = () => {
    const [list,setList] = useState([]);
    const [loading,setloading] = useState(true);
    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/users/artisans/${id}`);
                setList(res.data.users);
                setloading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[id]);

    console.log(list)

    if(loading) return<h1>Loading....</h1>
    return (
        <>
        <Header />
            <main className="main addetails">
                {list.length === 0 ? (
                    <div className="item-container empty-advert">
                        <h3 className="heading">No Advert</h3>
                    </div>
                ) : (
                    list.map((item,i)=>{
                        return (
                            <Link to={`/addetails/${item._id}`} key={i}>
                                <div className="item-container">
                                    <div className="image-area">
                                        <img src={`../assets/${item.image[0].originalname}`} alt={item.firstname} />
                                    </div>
                                    <div className="text-area">
                                        <h3 className="heading">{item.firstname + " " + item.lastname}</h3>
                                        <p className="paragraph">{item.aboutme}</p>
                                        <div className="category-banne">
                                            <div className="banner"><h3 className="heading">{item.category}</h3></div>
                                        </div>

                                        <div className="location">
                                            <img src="../assets/icons8-map-pin-30.png" alt="icons8-map-pin-30.png" />
                                            <p className="paragraph">{item.address + ", " +  item.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                ) }
            </main>
        <Footer />
        </>
    );
}
 
export default AdDetails;