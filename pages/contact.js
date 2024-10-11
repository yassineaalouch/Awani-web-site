import Footer from "@/interfaceComponents/Footer";
import Formulair from "@/interfaceComponents/Formulair";
import Nav_bar_interface from "@/interfaceComponents/Nav-bar-interface";
import { useEffect,useState } from "react";
import axios from "axios";
import ContactCard from "@/components/ContactCart";


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
        <div className="bg-gray-950">
        <Nav_bar_interface/>
        {/* <div className="bg-[url('/miel_bg_1.webp')] bg-bottom bg-fixed md:h-[145vh] md:mt-[-25px] lg:h-[150vh]"> */}
        <div className="h-screen flex items-center justify-center">
          <div >    
            <Formulair blacklist={blacklist} className=""/>
          </div>
          <div>
            <ContactCard/>
          </div>
        </div>
        <Footer className="!mt-0"/>
        </div>
    );
}