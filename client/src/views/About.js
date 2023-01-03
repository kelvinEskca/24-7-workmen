import Hero from "../components/Hero";
import Testimonial from "../components/Testimonials";
import TopCard from "../components/TopCard";
import TeamCard from "../components/TeamCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
    return (
        <>
            <Header />
            <main className="main">
                <Hero heading={'About Us'} paragraph={'Home > About Us'} />

                <section className="section about">
                    <div className="wrapper">
                        <TopCard heading={'Our Story'} paragraph={'Watch the video to know more'} />
                        <div className="boxes">
                            <div className="box">
                                <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt repellendus eligendi praesentium amet, quia repellat!</p>
                                <img src="../assets/blog_10-710x480.jpg" alt="blog" />
                            </div>

                            <div className="box">
                                <img src="../assets/blog_10-710x480.jpg" alt="blog" />
                                <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt repellendus eligendi praesentium amet, quia repellat!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section testimonials">
                    <div className="wrapper">
                        <TopCard heading={'Our Testimonial'} paragraph={'The Clients tell about us'} />
                        <div className="boxes">
                            <Testimonial />
                        </div>
                    </div>
                </section>

                <section className="section team">
                    <div className="wrapper">
                        <TopCard heading={'Our Team'} paragraph={'We are a strong team about'} />
                        <div className="boxes">
                            <TeamCard heading={'Vilas Makwana'} paragraph={'Website esigner'} image={'../assets/blog_8-710x480.jpg'} />

                            <TeamCard heading={'Vilas Makwana'} paragraph={'Website esigner'} image={'../assets/blog_8-710x480.jpg'} />

                            <TeamCard heading={'Vilas Makwana'} paragraph={'Website esigner'} image={'../assets/blog_8-710x480.jpg'} />

                            <TeamCard heading={'Vilas Makwana'} paragraph={'Website esigner'} image={'../assets/blog_8-710x480.jpg'} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
        
    );
}
 
export default About;