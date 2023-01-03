const WorkCard = ({image,heading,paragraph}) => {
    return (
        <div className="box">
            <div className="circle">
                <img src={image} alt="icon" />
            </div>
            <h3 className="heading">{heading}</h3>
            <p className="paragraph">{paragraph}</p>
        </div>
    );
}
 
export default WorkCard;