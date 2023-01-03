import Hero from "../components/Hero";
import BlogSingleCard from "../components/BlogSingleCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React,{useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
const SingleBlog = () => {
    const [list,setList] = useState([]);
    const [loading,setloading] = useState(true);
    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
                setList(res.data);
                setloading(false)
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[id]);
    const {blogname,blogcategory,createdAt,blogdescription} = list;
    if(loading) return <h1>Loading</h1>
    return (
        <>
            <Header />
            <main className="main">
                <Hero heading={'Single Blog'} paragraph={'Home > Single Blog'} /> 
                <section className="section blogs blog-single">
                    <div className="wrapper">
                        <div className="boxes">
                          
                            <BlogSingleCard 
                            image={`../assets/${list.blogimage[0].originalname}`} 
                            heading={blogname} category={blogcategory} date={createdAt} paragraph={blogdescription} />
                            
                            
                        </div>
                    </div>
                </section> 
            </main>
            <Footer />
        </>
    );
}
 
export default SingleBlog;