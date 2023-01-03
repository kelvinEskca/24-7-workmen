import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowCard from "../components/HowCard";
const How = () => {
    return (
        <>
            <Header />
            <main className="main">
                <Hero heading={'How it works'} paragraph={'Home > How it works'} />

                <section className="section how">
                    <div className="wrapper">
                        <div className="boxes">
                            <HowCard steps={'01'} heading={'Register An Account'} paragraph={'Proin ut iaculis odio. Etiam lobortis sit amet augue sit amet accumsan. Nulla sed ex placerat, vehicula tellus et, dictum metus. Vivamus pharetra vehicula tortor, eu iaculis leo maximus ut. Curabitur vel feugiat diam. Nunc sed tortor vitae tellus egestas rhoncus in eu ante.'} linktext={'Register an Account'} link={'/register'} />

                            <HowCard steps={'02'} heading={'Register An Account'} paragraph={'Proin ut iaculis odio. Etiam lobortis sit amet augue sit amet accumsan. Nulla sed ex placerat, vehicula tellus et, dictum metus. Vivamus pharetra vehicula tortor, eu iaculis leo maximus ut. Curabitur vel feugiat diam. Nunc sed tortor vitae tellus egestas rhoncus in eu ante.'} linktext={'Register an Account'} link={'/register'} />

                            <HowCard steps={'03'} heading={'Register An Account'} paragraph={'Proin ut iaculis odio. Etiam lobortis sit amet augue sit amet accumsan. Nulla sed ex placerat, vehicula tellus et, dictum metus. Vivamus pharetra vehicula tortor, eu iaculis leo maximus ut. Curabitur vel feugiat diam. Nunc sed tortor vitae tellus egestas rhoncus in eu ante.'} linktext={'Register an Account'} link={'/register'} />

                            <HowCard steps={'04'} heading={'Register An Account'} paragraph={'Proin ut iaculis odio. Etiam lobortis sit amet augue sit amet accumsan. Nulla sed ex placerat, vehicula tellus et, dictum metus. Vivamus pharetra vehicula tortor, eu iaculis leo maximus ut. Curabitur vel feugiat diam. Nunc sed tortor vitae tellus egestas rhoncus in eu ante.'} linktext={'Register an Account'} link={'/register'} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default How;