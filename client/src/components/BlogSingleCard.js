const BlogSingleCard = ({image,category,date,heading,paragraph}) => {
    return (
        <div className="box">
            <div className="image main-blog-image">
                <img src={image} alt="images" />
            </div>
            <div className="blog-bottom main-blog-bottom">
                <h3 className="heading">{heading}</h3>
                <div className="icon-box">
                    <div className="icon">
                        <img src="../assets/icons8-sorting-30.png" alt="icon" />
                        <p className="paragraph">{category}</p>
                    </div>
                    <div className="icon">
                        <img src="../assets/icons8-calendar-13-30.png" alt="icon" />
                        <p className="paragraph">{date}</p>
                    </div>
                </div>
                <div className="text">
                    <p className="paragraph">{paragraph}</p>
                </div>
            </div>
        </div>
    );
}
 
export default BlogSingleCard;