import Footer from "@/interfaceComponents/Footer";
import Formulair from "@/interfaceComponents/Formulair";
import Nav_bar_interface from "@/interfaceComponents/Nav-bar-interface";
import { useEffect,useState } from "react";
import axios from "axios";
import ContactCard from "@/components/ContactCart";
import MapLocation from "@/components/MapLocation";


export default function ContactUs(){

    const [blacklist,setBlackList] = useState([])

    useEffect(()=>{
        fetchBlackList() 
      },[])
    
      function fetchBlackList() {
        axios.get('/api/BlackList',{ headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
        }})
          .then(result => {
            const list = result.data.map((ele)=>(ele.email))
            setBlackList(list);
          })
          .catch(err => console.error("Error fetching admins: ", err));
      }
    return(
        <div className="">
        <Nav_bar_interface/>
        <div className=" flex flex-col justify-center mt-10 items-center text-2xl">
          <h1 className="text-2xl md:text-4xl border-b-4 border-black m-3 font-extrabold">
            تواصل معنا
          </h1>
          <p className="w-2/3 text-center">
            زبوننا العزيز، إذا كان لديك أي تساؤلات، استفسارات أو شكاوى، لا تتردد في التواصل معنا. يمكنك مراسلتنا عبر البريد الإلكتروني أو عبر تطبيق واتساب أو استخدام النموذج أدناه. نشكرك جزيلاً على ثقتك بمنتجاتنا وخدماتنا ونتطلع لخدمتك بأفضل ما لدينا.
          </p>
        </div>
        <div className="h-screen my-9 flex justify-center items-center ">
          <div className="flex w-full flex-col md:flex-row gap-3 justify-center h-fit">
              <div className="">
                <ContactCard/>
              </div>
              <div >    
                <Formulair blacklist={blacklist} className=" !h-full"/>
              </div>
          </div>
        </div>
        <div>
        <div className=" flex flex-col justify-center mt-10 items-center text-2xl">
          <h1 className="text-4xl border-b-4 border-black m-3 font-extrabold">
          زورو محلاتنا 
          </h1>
          <p className="w-2/3 text-center">
          يمكنكم أيضاً زيارتنا في محلنا لاكتشاف منتجاتنا والاستفادة من خدماتنا مباشرة. سنكون سعداء باستقبالكم          
          </p>
        </div>
        {/* <p className="w-full text-2xl mt-10 text-center">
        يمكنكم أيضاً زيارتنا في محلنا لاكتشاف منتجاتنا والاستفادة من خدماتنا مباشرة. سنكون سعداء باستقبالكم          
        </p> */}
        </div>
        <div className="grid grid-cols-2 text-center gap-5 px-10 my-10">
          <div>
            <h2 className="pb-3 text-[1.1rem] ">
                المحل الأول يقع في تيط مليل قرب مقهى إولي   
            </h2>
            <div className="border-gray-300 rounded-md border-2">
              <MapLocation url ={"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3324.2424337578495!2d-7.527050524303916!3d33.573054173341134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM0JzIzLjAiTiA3wrAzMScyOC4xIlc!5e0!3m2!1sen!2sma!4v1728853045680!5m2!1sen!2sma"}/>
            </div>
          </div>
          <div>
            <h2 className="pb-3 text-[1.1rem] ">
               المحل الأول يقع في تيط مليل قرب مقهى إولي   
            </h2>
            <div className="border-gray-300 rounded-md border-2">
              <MapLocation url={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251.9952181389887!2d-7.483418606436457!3d33.54892934301149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda634dfc387e70d%3A0x9d353339dee9142e!2sGGX8%2BHP9%2C%20Bd%20Bassatine%2C%20Titt%20Mellilen!5e0!3m2!1sen!2sma!4v1728420838452!5m2!1sen!2sma"}/>
            </div>
          </div>
        </div>
        <Footer className="!mt-0"/>
        </div>
    );
}