const Testimonial = () => {
    const data = [
        
        {
            title:"Jon Doe",
            position:"Developer",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam itaque molestiae aut a, adipisci modi omnis maxime accusantium explicabo!"
        },
        {
            title:"Jon Doe",
            position:"Developer",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam itaque molestiae aut a, adipisci modi omnis maxime accusantium explicabo!"
        },
        {
            title:"Jon Doe",
            position:"Developer",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam itaque molestiae aut a, adipisci modi omnis maxime accusantium explicabo!"
        },
        {
            title:"Jon Doe",
            position:"Developer",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam itaque molestiae aut a, adipisci modi omnis maxime accusantium explicabo!"
        },
        {
            title:"Jon Doe",
            position:"Developer",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam itaque molestiae aut a, adipisci modi omnis maxime accusantium explicabo!"
        }
        
    ]

    return (
        <div className="box">
            {data.map((customer,i)=>{
                return <div className="testimonial-box" key={i}>
                    <div className="testimonial-details">
                        <p className="paragraph">{customer.description}</p>
                    </div>
                    <div className="testimonial-wrapper">
                        <div className="person"></div>
                        <div className="person-details">
                            <h3 className="heading">{customer.title}</h3>
                            <p className="paragraph">{customer.position}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
}
 
export default Testimonial;