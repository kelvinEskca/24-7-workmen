import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
const WishList = () => {
    return (
        <>
            <Header />
            <main className="main">
                <Hero heading={'Wishlist'} paragraph={'Home > Wishlist'} />
                
                <section className="section wishlist">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">You don't have any event in wishlist.</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default WishList;