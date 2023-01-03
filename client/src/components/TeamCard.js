const TeamCard = ({image,heading,paragraph}) => {
    return (
        <div className="box">
            <div className="image-box">
                <img src={image} alt="icon" />
            </div>
            <div className="text-box">
                <h3 className="heading">{heading}</h3>
                <p className="paragraph">{paragraph}</p>
            </div>
        </div>
    );
}
 
export default TeamCard;