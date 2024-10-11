import { FaHandsHelping, FaLightbulb, FaUsers } from 'react-icons/fa';
import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import axios from "axios";
import { useState , useEffect} from "react";

export default function About() {
    const [Q_A_List ,setQ_A_List]= useState([])
    let list =[
        {titre:'من نحن',text:'نحن فريق ملتزم بتقديم أفضل الحلول لعملائنا. رؤيتنا هي تحقيق الابتكار من خلال تقديم خدمات عالية الجودة لتمكين الأفراد والشركات.'},
        {titre:'قصتنا',text:'بدأنا رحلتنا برؤية لتغيير الطريقة التي تتفاعل بها الشركات مع التكنولوجيا. من خلال تقديم حلول مخصصة، تمكنا من مساعدة العديد من الشركات على النمو وتحقيق أهدافها. هدفنا هو مواصلة هذه الرحلة معكم من خلال تقديم حلول مبتكرة تلبي احتياجاتكم المتزايدة.'},
    ]
    useEffect(() => {
        getQuestions() 
    },[]);
    async function getQuestions(){
        await axios.get('/api/Question_Answer',{ headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }}).then(result=>{
            const list =result.data
            setQ_A_List(list.filter(element=>element.isAnswered===true).reverse())
        });
    }

    return (
        <>
            <NavBarInterface />
            <div className=" bg-gray-100 min-h-screen pb-16 mx-auto p-6">
    <div className="flex flex-col items-center gap-10 py-12 px-4 sm:px-6 lg:px-8">
        {list.map((ele,index)=>(
            <Paragraph key={index} titre = {ele.titre} text={ele.text}/>
        ))}
    </div>
        <div className=' w-full flex justify-center'>
            <div className='w-11/12'>
                <h1 className="md:text-3xl text-xl font-bold mb-8 justify-center gap-2 text-black flex">الأسئلة الشائعة<div className="h-10 w-1 bg-black"></div></h1>
                {Q_A_List.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
            </div>
            <div className=" w-screen h-16 bg-slate-900"></div>
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
function Paragraph({titre,text}){
    return(
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