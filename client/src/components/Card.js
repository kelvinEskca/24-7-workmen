const Card = ({image,heading,paragraph}) => {
    return (
        <div className="box">
            <img src={image} alt="icon" />
            <h3 className="heading">{heading}</h3>
            <p className="paragraph">{paragraph}</p>
        </div>
    );
}
 
export default Card;