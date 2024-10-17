"use client"
import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CartContext } from "@/components/cartContext";
import ThankYouCard from "@/components/ThankYouCard";
import { getSession } from "next-auth/react";
import Select from "react-select";


export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (session ) {
      return {
        props: {
            Session: JSON.parse(JSON.stringify(session)),
          }
      };
    }else{
        return{
        props: {
            product:null,
          }
        }
    }
}
export default function Checkout({Session}){
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const [ showMessage,setShowMessage] = useState (false)
    const [ isLoading,setIsLoading] = useState (false)
    const [cart,setCart] = useState(cartProducts)
    const [dropDownCountriesList,setDropDownCountriesList] = useState([])
  async function getCountriesList() {
    // Récupérer le temps de rafraîchissement depuis le localStorage
    const timeRefresh = localStorage.getItem('refreshTimeDropDownCountriesList');
    const savedCountriesList = localStorage.getItem('dropDownCountriesList');
    
    const currentTime = new Date();
    const threeMonthsInMilliseconds = 90 * 24 * 60 * 60 * 1000; // 90 jours en millisecondes
  
    console.log('localStorage.getItem("refreshTimeDropDownCountriesList")', timeRefresh);
    console.log('currentTime', currentTime);
  
    const lastRefreshTime = timeRefresh ? new Date(timeRefresh) : null;
  
    console.log('lastRefreshTime', lastRefreshTime);
  
    if (!savedCountriesList || !lastRefreshTime || (currentTime - lastRefreshTime) > threeMonthsInMilliseconds) {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map((ele) => ({
          name: ele.name.common,
          flag: ele.flag,
        }));
        
        setDropDownCountriesList(countries);
        localStorage.setItem('dropDownCountriesList', JSON.stringify(countries));
        localStorage.setItem('refreshTimeDropDownCountriesList', currentTime.toISOString());
        
        console.log('API appelée et liste mise à jour');
      } catch (error) {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    } else {
      // Si la liste est valide, la charger à partir du localStorage
      setDropDownCountriesList(JSON.parse(savedCountriesList));
      console.log('Liste chargée à partir du localStorage');
    }
  }
    const [formData, setFormData] = useState({
        userId:Session?.user?.id,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        cart
    });
    useEffect(()=>{
        getCountriesList()
        axios.get('/api/address',{params:{userId:Session?.user?.id}, headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }}).then((response)=>{if(response.data.length>0){setFormData({
            ...formData,
            userId:Session?.user?.id||'',
            firstName: response?.data[0].firstName || "",
            lastName: response?.data[0].lastName || "",
            email: response?.data[0].email || "",
            phone: response?.data[0].phone || "",
            address: response?.data[0].address || "",
            city: response?.data[0].city || "",
            postalCode: response?.data[0].postalCode || "",
            country: response?.data[0].country || "",
            
        })}})
    },[])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [deletePermission,setDeletePermission] = useState(false)
    useEffect(() => {
        if(cartProducts.length >0 ||deletePermission){
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            setDeletePermission(false)

        }
        
    }, [cartProducts]);

    async function handleSubmit(e) {
        e.preventDefault();
        if(formData.cart.length > 0 && formData.userId === Session?.user?.id){
            setIsLoading(true)
            
            await axios.post('/api/purchaseRequest', {...formData},{ headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
              }});
            setFormData({
                userId:'',
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                postalCode: "",
                country: "",
                cart:[]
            });
            setDeletePermission(true)
            setCartProducts([])
            setShowMessage(true)
            setTimeout(()=>setShowMessage(false)
            ,5000)
            setIsLoading(false)


        }else{
            alert('Your cart is empty')
        }
    }
    return (
        <>
        <NavBarInterface/>
        <div className="min-h-screen mt-10 p-6">
    {/* {!Session&&
        <div className="p-6 max-w-3xl mx-auto mb-3 bg-gray-100 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-700 mb-4">You must be logged in to view your cart and proceed with checkout.</p>
            <div className="text-gray-700 gap-1 flex mb-6">Please <Link href={'/Login'} className="text-yellow-500 underline cursor-pointer">log in</Link> or <Link href="/Login"><p className="text-yellow-500 underline">create an account</p></Link> to continue.</div>
        </div>
    } */}
    {!showMessage?
        <form onSubmit={handleSubmit}  className="max-w-3xl text-xs text-right sm:text-base mx-auto p-6 bg-white shadow-md border rounded-lg">
        
        <h2 className="md:text-2xl text-xl font-semibold mb-6">تأكيد الطلبية</h2>
    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700">
                الاسم الأول
            </label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                // disabled={!Session}
                onChange={handleChange} 
                className={`mt-1 block w-full border border-gray-300 text-right outline-none rounded-md shadow-sm p-2  focus:ring-black focus:border-black`}
                required
            />
            </div>
    
            <div>
            <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700">
                اسم العائلة
            </label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                // disabled={!Session}
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full border border-gray-300 text-right outline-none rounded-md shadow-sm p-2 focus:ring-black focus:border-black`}
                required
            />
            </div>
        </div>
    
    
        <div className="mt-4">
            <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">
            رقم الهاتف
            </label>
            <input
            type="tel"
            id="phone"
            name="phone"
            // disabled={!Session}
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full border  border-gray-300 text-right outline-none rounded-md shadow-sm p-2 focus:ring-black focus:border-black `}
            required
            />
        </div>
        {/* ${!Session? 'cursor-not-allowed':'cursor-default'}
         */}
        <div className="mt-4">
            <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700">
            العنوان
            </label>
            <input
            type="text"
            id="address"
            // disabled={!Session}
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 text-right outline-none rounded-md shadow-sm p-2 focus:ring-black focus:border-black`}
            required
            />
        </div>

    
        <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 block w-full bg-black border-2 border-black transition-all duration-300 hover:bg-white hover:text-black text-white py-2 px-4 rounded-md  `}
        >
        {isLoading? 'جاري الإرسال ....':'إتمام الطلب'}
        </button>
        </form>

        :

        <div>
            <ThankYouCard/>
        </div>
    }
</div>
<Footer/>
</>
    )}