const TopCard = ({heading,paragraph}) => {
    return (
        <div className="top">
            <h3 className="heading">{heading}</h3>
            <p className="paragraph">{paragraph}</p>
            <div className="line"></div>
        </div>
    );
}
 
export default TopCard;