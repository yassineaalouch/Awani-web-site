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
        <div className="bg-slate-50">
        <Nav_bar_interface/>
        <div className=" flex flex-col justify-center mt-10 items-center text-2xl">
          <h1 className="text-4xl border-b-4 border-black m-3 font-extrabold">
            تواصل معنا
          </h1>
          <p className="w-2/3 text-center">
            زبوننا العزيز، إذا كان لديك أي تساؤلات، استفسارات أو شكاوى، لا تتردد في التواصل معنا. يمكنك مراسلتنا عبر البريد الإلكتروني أو عبر تطبيق واتساب أو استخدام النموذج أدناه. نشكرك جزيلاً على ثقتك بمنتجاتنا وخدماتنا ونتطلع لخدمتك بأفضل ما لدينا.
          </p>
        </div>
        <div className="h-screen flex justify-center items-center ">
          <div className="flex w-full gap-3 justify-center h-5/6">

              <div className="w-2/5">
                <MapLocation isContactPage={true}/>
              </div>
              <div className="w-1/5">
                <ContactCard/>
              </div>
              <div >    
                <Formulair blacklist={blacklist} className=" !h-full"/>
              </div>

          </div>
        </div>
        <Footer className="!mt-0"/>
        </div>
    );
}