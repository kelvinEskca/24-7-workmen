import React,{useState} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
const Faq = () => {
    const [accordionState, setAccordionState]= useState(null);
    const accordionData = [
        {
            title:"Lorem ipsum dolor sit, amet consectetur adipisicing.",
            content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident veritatis omnis inventore incidunt numquam animi quibusdam, non quis reprehenderit id et deserunt dignissimos eos, delectus, quidem ipsa accusantium obcaecati.",
        },
        {
            title:"Lorem ipsum dolor sit, amet consectetur adipisicing.",
            content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident veritatis omnis inventore incidunt numquam animi quibusdam, non quis reprehenderit id et deserunt dignissimos eos, delectus, quidem ipsa accusantium obcaecati.",
        },
        {
            title:"Lorem ipsum dolor sit, amet consectetur adipisicing.",
            content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident veritatis omnis inventore incidunt numquam animi quibusdam, non quis reprehenderit id et deserunt dignissimos eos, delectus, quidem ipsa accusantium obcaecati.",
        },
        {
            title:"Lorem ipsum dolor sit, amet consectetur adipisicing.",
            content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident veritatis omnis inventore incidunt numquam animi quibusdam, non quis reprehenderit id et deserunt dignissimos eos, delectus, quidem ipsa accusantium obcaecati.",
        },
        {
            title:"Lorem ipsum dolor sit, amet consectetur adipisicing.",
            content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident veritatis omnis inventore incidunt numquam animi quibusdam, non quis reprehenderit id et deserunt dignissimos eos, delectus, quidem ipsa accusantium obcaecati.",
        },
    ]
    const handleClick = (i) =>{
        if( accordionState === i){
            return setAccordionState(null);
        }
        console.log(i);
        setAccordionState(i)
    }
    return (
        <>
            <Header />
            <main className="main">
                <Hero heading={'Faq'} paragraph={'Home > Faq'} />
                
                <section className="section faq-tab">
                    <div className="wrapper">
                        <h3 className="heading">Frequently Asked Questions</h3>
                        <p className="paragraph">Nunc in ornare urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac</p>
                        <div className="boxes">
                            {accordionData.map((items,i) => {
                                return(
                                    <div className={`box ${accordionState === i ? 'accordionFull' : ''}`} onClick={() => handleClick(i)} key={i}>
                                        <div className="box-top">
                                            <div className="plus">
                                                <h3 className="heading">+</h3>
                                            </div>
                                            <div className="title-box"><h3>{items.title}</h3></div>
                                        </div>
                                        <div className="box-bottom">
                                            <p className="paragraph">{items.content}</p>
                                            <p className="paragraph">{items.content}</p>
                                            <p className="paragraph">{items.content}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default Faq;