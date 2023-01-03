const Hero = ({heading,paragraph}) => {
    return (
        <section className="section hero">
            <div className="wrapper">
                <div className="boxes">
                    <div className="box">
                        <h3 className="heading">{heading}</h3>
                        <p className="paragraph">{paragraph}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Hero;