const MostCard = ({image,paragraph,heading}) => {
    return (
        <div className="box">
            <div className="long-image">
                <img src={image} alt="longimage" />
            </div>
            <div className="text">
                <h3 className="heading">{heading}</h3>
                <p className="paragraph">{`${paragraph} + Searches`}</p>
            </div>
        </div>
    );
}
 
export default MostCard;