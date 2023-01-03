import React,{useEffect,useState} from "react";
import Hero from "../components/Hero";
import BlogCard from '../components/BlogCard';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
const Blog = () => {
    const [blog,setblog] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const getblog = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/blog');
                setblog(res.data.blogs);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getblog();
    },[]);
    
    if(loading) return <h1>Loading</h1>
    return (
        <>
            <Header />
            <main className="main">
                <Hero heading={'Blog'} paragraph={'Home > Blog'} />  
                
                <section className="section blogs">
                    <div className="wrapper">
                        <div className="boxes">
                            {blog.map((item,i)=>{
                                return (
                                    <BlogCard image={`../assets/${item.blogimage[0].originalname}`} heading={item.blogname} paragraph={item.blogdescription} link={`/singleBlog/${item._id}`} key={i}/>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default Blog;