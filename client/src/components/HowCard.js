import { Link } from "react-router-dom";

const HowCard = ({steps,heading,paragraph,link,linktext}) => {
    return (
        <div className="box">
            <div className="row">
                <div className="circle">
                    <h3 className="heading">{steps}</h3>
                </div>

                <div className="text-details">
                    <h3 className="heading">{heading}</h3>
                    <p className="paragraph">{paragraph}</p>
                    <Link to={link}><button>{linktext}</button></Link>
                </div>
            </div>
        </div>
    );
}
 
export default HowCard;