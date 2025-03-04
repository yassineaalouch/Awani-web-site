import { FaHandsHelping, FaLightbulb, FaUsers } from 'react-icons/fa';
import Footer from "@/components/interfaceComponents/Footer";
import NavBarInterface from "@/components/interfaceComponents/Nav-bar-interface";
import axios from "axios";
import { useState, useEffect } from "react";

export default function About() {
    const [Q_A_List, setQ_A_List] = useState([])
    let list = [
        { titre: 'من نحن', text: 'نحن منصة توصيل متخصصة في تسهيل تحضير الإفطار خلال شهر رمضان المبارك. نقدم مجموعة واسعة من المنتجات عالية الجودة من شركائنا الموثوقين بأسعار تنافسية، مع التركيز على تقديم خدمة سريعة وموثوقة تلبي احتياجات عملائنا.' },
        { titre: 'رؤيتنا', text: 'نسعى لأن نكون الخيار الأول للعائلات خلال شهر رمضان من خلال توفير تجربة تسوق سلسة وخدمة توصيل موثوقة. نؤمن بأن وقتكم ثمين، خاصة خلال هذا الشهر الفضيل، لذلك نحرص على تقديم خدمة تساعدكم في التركيز على العبادة والعائلة بدلاً من القلق بشأن التسوق والتحضير للإفطار.' },
    ]
    useEffect(() => {
        getQuestions()
    }, []);
    async function getQuestions() {
        await axios.get('/api/Question_Answer', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        }).then(result => {
            const list = result.data
            setQ_A_List(list.filter(element => element.isAnswered === true).reverse())
        });
    }

    return (
        <>
            <NavBarInterface />
            <div className="bg-gray-100 min-h-screen pb-16 mx-auto p-6">
                <div className="flex flex-col items-center gap-10 py-12 px-4 sm:px-6 lg:px-8">
                    {list.map((ele, index) => (
                        <div key={index} className="max-w-4xl w-full">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
                                    {ele.titre}
                                </h1>
                                <div className="h-1 w-20 bg-[#6bb41e] mx-auto mb-6"></div>
                                <p className="text-lg text-gray-700 text-center">
                                    {ele.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full flex justify-center'>
                    <div className='w-11/12'>
                        <h1 className="md:text-3xl text-xl font-bold mb-8 justify-center gap-2 text-black flex">الأسئلة الشائعة<div className="h-10 w-1 bg-black"></div></h1>
                        {Q_A_List.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer className="w-screen !mt-0" />
        </>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 border-b pb-4 border-yellow-950">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`transform transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
                <h2 className="md:text-xl text-base font-semibold text-right w-full pl-2 text-yellow-950">{question}</h2>
            </div>
            {isOpen && <p className="text-xs md:text-base mt-4 pl-5 text-right text-yellow-950">{answer}</p>}
        </div>
    );
}

function Paragraph({ titre, text }) {
    return (
        <div className="max-w-4xl w-full text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
                {titre}
            </h1>
            <p className="mt-4 text-lg text-gray-700">
                {text}
            </p>
        </div>
    )
}