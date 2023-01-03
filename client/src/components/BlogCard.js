import { Link } from "react-router-dom";

const BlogCard = ({image,heading,paragraph,link}) => {
    return (
        <div className="box">
            <div className="image">
                <img src={image} alt="images" />
            </div>
            <div className="blog-bottom">
                <h3 className="heading">{heading}</h3>
                <div className="text">
                    <p className="paragraph">{paragraph}</p>
                </div>
                <Link to={link}><button>Read More</button></Link>
            </div>
        </div>
    );
}
 
export default BlogCard;