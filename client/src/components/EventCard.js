const EventCard = ({image,event,title,details}) => {
    return (
        <div className="box">
            <div className="image-area">
                <img src={image} alt="icon" />
                <h3 className="heading">{event}</h3>
            </div>

            <div className="text">
                <h3 className="heading">{title}</h3>
                <p className="paragraph">{details}</p>
            </div>
        </div>
    );
}
 
export default EventCard;