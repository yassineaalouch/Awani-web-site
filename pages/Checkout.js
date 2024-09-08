"use client"
import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CartContext } from "@/components/cartContext";
import ThankYouCard from "@/components/ThankYouCard";
import { getSession } from "next-auth/react";

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
            <div className="min-h-screen mt-14 p-6">
                {!Session&&
                    <div className="p-6 max-w-3xl mx-auto mb-3 bg-gray-100 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
                        <p className="text-gray-700 mb-4">You must be logged in to view your cart and proceed with checkout.</p>
                        <div className="text-gray-700 gap-1 flex mb-6">Please <Link href={'/Login'} className="text-yellow-500 underline cursor-pointer">log in</Link> or <Link href="/Login"><p className="text-yellow-500 underline">create an account</p></Link> to continue.</div>
                    </div>
                }
                {!showMessage?
                    <form onSubmit={handleSubmit}  className="max-w-3xl text-xs sm:text-base mx-auto p-6 bg-white shadow-md border rounded-lg">
                    
                    <h2 className="md:text-2xl text-xl font-semibold mb-6">Billing Information</h2>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            disabled={!Session}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${!Session? 'cursor-not-allowed':'cursor-default'} border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                            required
                        />
                        </div>
                
                        <div>
                        <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            disabled={!Session}
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${!Session? 'cursor-not-allowed':'cursor-default'} border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                            required
                        />
                        </div>
                    </div>
                
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Email Address
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        disabled={!Session}
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${!Session? 'cursor-not-allowed':'cursor-default'} border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                        required
                        />
                    </div>
                
                    <div className="mt-4">
                        <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Phone Number
                        </label>
                        <input
                        type="tel"
                        id="phone"
                        name="phone"
                        disabled={!Session}
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${!Session? 'cursor-not-allowed':'cursor-default'} border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                        required
                        />
                    </div>
                
                    <div className="mt-4">
                        <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Address
                        </label>
                        <input
                        type="text"
                        id="address"
                        disabled={!Session}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${!Session? 'cursor-not-allowed':'cursor-default'} border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                        required
                        />
                    </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div>
                        <label htmlFor="city" className="block text-xs sm:text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            disabled={!Session}
                            value={formData.city}
                            onChange={handleChange}
                            className={`mt-1 block w-full ${!Session? 'cursor-not-allowed':'cursor-default'} border border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                            required
                        />
                        </div>
                
                        <div>
                        <label htmlFor="postalCode" className="block text-xs sm:text-sm font-medium text-gray-700">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            disabled={!Session}
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className={`mt-1 block w-full ${!Session? 'cursor-not-allowed':'cursor-default'} border border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                            required
                        />
                        </div>
                
                        <div>
                        <label htmlFor="country" className="block text-xs sm:text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            disabled={!Session}
                            value={formData.country}
                            onChange={handleChange}
                            className={`mt-1 block w-full ${!Session? 'cursor-not-allowed':'cursor-default'}  border border-gray-300 outline-none rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                            required
                        />
                        </div>
                    </div>
                
                    <button
                        type="submit"
                        disabled={!Session||isLoading}
                        className={`mt-2 block w-full ${!Session? 'cursor-not-allowed':'cursor-default'}  bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    >
                    {isLoading? 'Sending ....':'Place Order'}
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
      );
    };