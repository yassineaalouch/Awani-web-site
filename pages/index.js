import Footer from "@/interfaceComponents/Footer";
import Nav_bar_interface from "@/interfaceComponents/Nav-bar-interface";
import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { GiBee } from "react-icons/gi";
import InfoCard from "@/interfaceComponents/InfoCard";
import Hr from "@/interfaceComponents/Hr";

export default function Home() {
  function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 border-b pb-4 border-yellow-950">
            <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="md:text-xl text-base font-semibold text-yellow-950">{question}</h2>
                <span className={`transform transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>
            {isOpen && <p className="text-xs md:text-base mt-4 pl-5 text-yellow-950">{answer}</p>}
        </div>
    );
}

  return (
    <>
 
      <Nav_bar_interface />
{true &&
  <div className="max-w-screen-2xl mx-auto overflow-hidden">
        <div className="">
          <div className="bg-fixed min-w-full bg-center h-[80vh] lg:h-screen bg-[url('/miel_bg_1.webp')]">
            <div className="h-full w-full bg-gradient-to-r from-black-transparent to-yellow-900-transparent bg-opacity-50 flex">
              <div className="text-white w-[100%] text-center md:text-left md:max-w-[70%] lg:max-w-[50%] p-12 ">
                <div className="font-extrabold text-3xl lg:text-4xl pt-12 md:pt-12 lg:pt-24 pb-4">
                  Follow the weight of your hives remotely with our connected scale!
                </div>
                <div className="font-semibold text-sm lg:text-base">
                  Honeyflow detection, reserve status, colony health, weather. Reduce your trips and optimize your production!
                </div>
                <button className="bg-white text-black animation-color-yassine font-semibold rounded-md p-2 px-3 mt-4 hover:bg-yellow-500 hover:scale-105 hover:text-white transition-all duration-200">
                  Discover our products
                </button>
                <ul className="flex mt-4 lg:mt-9 gap-10 md:pl-4  justify-center md:justify-start">
                  <li>
                    <a href="https://www.dadant.com/">
                      <FaFacebook className="text-white text-lg hover:text-blue-500 transition-colors duration-200" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialInstagram className="text-white text-lg hover:text-pink-500 transition-colors duration-200" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaXTwitter className="text-white text-lg hover:text-blue-400 transition-colors duration-200" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="hidden md:flex h-full items-center py-12 justify-center">
                <img src="laptop.webp" alt="Laptop" className="max-w-[80%]"/>
              </div>
            </div>
          </div>


          <Hr titre="benefice"/>

          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center p-5">
            <InfoCard
              Icon={IoSettings}
              title="Production monitoring"
              description="Follow the honey flows and optimize your movements by intervening on your apiaries at the right time."
            />
            <InfoCard
              Icon={BsGraphUpArrow}
              title="Reserve control"
              description="Remotely control the reserves of your colonies to ensure wintering."
            />
            <InfoCard
              Icon={FaHandHoldingMedical}
              title="Awareness-raising tool"
              description="Ideal for CSR initiatives, Bee2beep provides dedicated public spaces."
            />
            <InfoCard
              Icon={GiBee}
              title="State of the colony"
              description="Watch over your colonies by following your season, resumption of laying, number of bees, weather."
            />
          </div>



          <Hr titre="Connected scale"/>

        <div className="hidden md:flex h-2xl  justify-center py-6">
          <div className="space-y-5 w-1/3">
            <div className="w-full h-1/3 flex justify-end">
                <div className="rounded-3x w-[70%] space-y-2 flex-col flex justify-center text-center bg-white animate-move-in-left hover:bg-yellow-50 border border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800">Remote Access:</h1>
                  <p className="text-sm px-3 pb-2">Information accessible from your computer or smartphone.</p>
                </div>
            </div>
            <div className="w-full h-1/3 flex justify-center">
              <div className="rounded-3x w-[70%] space-y-2 flex-col flex justify-center text-center bg-white  animate-move-in-left border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800">Alert System:</h1>
                  <p className="text-sm px-3 pb-2"> Sends alerts in case of theft or pillaging.</p>
              </div>
            </div>
            <div className="w-full h-1/3 flex justify-end">
              <div className="rounded-3x w-[70%] space-y-2 flex-col flex justify-center text-center bg-white animate-move-in-left border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800">Weather Data:</h1>
                  <p className="text-sm px-3 pb-2">Provides local weather data.</p>
              </div>
            </div>
          </div>

          <div className="w-1/3 m-3 flex p-9 animate-move-to-Up items-center max-h-fit rounded-full"><img className="bg-yellow-500 rounded-full" src="balance-connectee-ruche-v2-1.webp"/></div>

          <div className=" space-y-5 w-1/3">
            <div className="w-full h-1/3 flex justify-start">
            <div className="rounded-3x w-[70%] space-y-2 flex-col flex justify-center text-center bg-white animate-move-in-right border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800">Remote Monitoring:</h1>
                  <p className="text-sm px-3 pb-2"> Provides all necessary information to monitor your beehives remotely.</p>
              </div>
            </div>
            <div className="w-full h-1/3 flex justify-center">
            <div className="rounded-3x w-[70%] space-y-2 flex-col flex justify-center text-center bg-white animate-move-in-right border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800">Honey Flow Detection:</h1>
                  <p className="text-sm px-3 pb-2"> Detects honey flows and checks the status of reserves.</p>
              </div>
            </div>
            <div className="w-full h-1/3 flex justify-start">
            <div className="rounded-3x w-[70%] space-y-2 flex-col flex justify-center text-center bg-white animate-move-in-right border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800">Health Monitoring:</h1>
                  <p className="text-sm px-3 pb-2">Monitors the health of your colonies.</p>
              </div>
            </div>
          </div>
        </div>


        <div className="md:hidden grid grid-cols-1 h-2xl gap-5 place-items-center py-6">
          
             
              <div className="rounded-3x w-[60%] h-32 py-5 flex-col justify-center text-center bg-white animate-move-in-left hover:bg-yellow-50 border border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800 mb-2">Remote Access:</h1>
                  <p className="text-sm">Information accessible from your computer or smartphone.</p>
              </div>
            
              <div className="rounded-3x w-[60%] h-32 py-5 flex-col flex justify-center text-center bg-white animate-move-in-right border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800 mb-2">Honey Flow Detection:</h1>
                  <p className="text-sm "> Detects honey flows and checks the status of reserves.</p>
              </div>
              
             
              <div className="rounded-3x w-[60%] h-32 py-5 flex-col flex justify-center text-center bg-white animate-move-in-left border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800 mb-2">Weather Data:</h1>
                  <p className="text-sm ">Provides local weather data.</p>
              </div>
          
             
              <div className="rounded-3x w-[60%] h-32 flex-col py-5 flex justify-center text-center bg-white animate-move-in-right border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800 mb-2">Remote Monitoring:</h1>
                  <p className="text-sm"> Provides all necessary information to monitor your beehives remotely.</p>
              </div>
            
             
              <div className="rounded-3x w-[60%] h-32 flex-col py-5 flex justify-center text-center bg-white  animate-move-in-left border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800 mb-2">Alert System:</h1>
                  <p className="text-sm "> Sends alerts in case of theft or pillaging.</p>
              </div>
            
            
             
              <div className="rounded-3x w-[60%] h-32 flex-col py-5 flex justify-center text-center bg-white animate-move-in-right border hover:bg-yellow-50 border-yellow-300 shadow-lg rounded-xl">
                  <h1 className="font-bold text-yellow-800 mb-2">Health Monitoring:</h1>
                  <p className="text-sm">Monitors the health of your colonies.</p>
              </div>
           
          
        </div>


        <Hr titre="Brood Sensor"/>
          

          <div className="w-full mt-10 grid grid-cols-1 place-items-center gap-10 md:grid-cols-2 ">
              <div className="flex justify-start pl-8 py-3  w-5/6 md:w-full lg:hidden h-fit md:ml-72 rounded-l-3xl bg-yellow-500">
                <img className="max-h-40" src="capteurs-de-couvain-pour-ruche-3-removebg-preview.png" alt="capteurs-de-couvain-pour-ruche-3" />
              </div>
            <div className="w-full pl-3 h-full max-w-lg rounded-xl">
              <div className="flex gap-2 ">
                    <span className=" border-l-yellow-500 pl-2 border-l-8 h-fit mb-5">
                      <h1 className="before-side-bar font-bold text-2xl md:text-3xl">Brood Sensor</h1>
                      <div className="font-semibold text-lg py-1 ">Temperature & Humidity of Brood</div>
                    </span>

              </div>
              <div className="pl-2 border-l-8 border-white ">
                Closely monitor the living conditions of your colonies, ensure their comfort and well-being. Our innovative sensor allows you to delve into the heart of your beehive by accurately measuring the temperature and humidity inside the hive.
              </div>
              <div className="mt-7 pl-3 md:pl-7 border-l-8 border-white">
                <ul className="flex-col flex gap-2 text-sm text-gray-500  ">
                  <li>Measures the temperature and humidity of the brood.</li>
                  <li>Remote Data Transmission (1 Message/Hour)</li>
                  <li>Colony Health and Queen Activity</li>
                </ul>
              </div>
            </div>
            <div className="hidden pl-12 p-5 lg:flex w-full h-fit rounded-l-3xl justify-start bg-yellow-500">
                  <img className="max-h-[22rem]" src="capteurs-de-couvain-pour-ruche-3-removebg-preview.png" alt="capteurs-de-couvain-pour-ruche-3" />
            </div>
          </div>

          <Hr titre="Your interface online"/>

          <div className=" w-screen grid grid-cols-1 gap-8 md:grid-cols-2  mt-10 h-auto"> 
              <div className="md:w-full w-5/6 min-w-60 md:min-h-96 md:min-w-fit md:pl-0 md:ml-0 mr-36 p-12 max-h-80 rounded-r-3xl flex justify-end pr-5 py-3 bg-yellow-500">
                  <img className="" src="interface.webp"></img>
              </div>
              <div className="flex justify-end">
                <div className="md:ml-4 pl-3 md:w-full flex flex-col">
                  <div className="flex gap-2 ">
                      <h1 className="before-side-bar h-fit border-l-yellow-500 pl-2 border-l-8 font-bold text-2xl md:text-3xl mb-5">Features designed to achieve energy autonomy</h1>
                  </div>
            
                  <div className="pl-2 border-l-8 border-white ">
                    <ul className="flex-col space-y-3 ">
                      <li>Data monitoring</li>
                      <li>Performance analysis</li>
                      <li>Portfolio overview</li>
                      <li>Reporting and data export</li>
                      <li>Anomaly detection</li>
                      <li>Custom dashboards</li>
                    </ul>
                  </div>
                    
                </div>
              </div>
            
          </div>

        </div>
      </div>
}
      
  <Footer className="mt-5"></Footer>

    
    </>
  );
}
