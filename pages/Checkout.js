"use client"
import Footer from "@/components/interfaceComponents/Footer";
import NavBarInterface from "@/components/interfaceComponents/Nav-bar-interface";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CartContext } from "@/context/cartContext";
import ThankYouCard from "@/components/ThankYouCard";
import { getSession } from "next-auth/react";
import Select from "react-select";


export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        return {
            props: {
                Session: JSON.parse(JSON.stringify(session)),
            }
        };
    } else {
        return {
            props: {
                product: null,
            }
        }
    }
}
export default function Checkout({ Session }) {
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const [showMessage, setShowMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [cart, setCart] = useState(cartProducts)
    const [dropDownCountriesList, setDropDownCountriesList] = useState([])
    async function getCountriesList() {
        // Récupérer le temps de rafraîchissement depuis le localStorage
        const timeRefresh = localStorage.getItem('refreshTimeDropDownCountriesList');
        const savedCountriesList = localStorage.getItem('dropDownCountriesList');

        const currentTime = new Date();
        const threeMonthsInMilliseconds = 90 * 24 * 60 * 60 * 1000; // 90 jours en millisecondes


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
        userId: Session?.user?.id,
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
    useEffect(() => {
        getCountriesList()
        axios.get('/api/address', {
            params: { userId: Session?.user?.id }, headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        }).then((response) => {
            if (response.data.length > 0) {
                setFormData({
                    ...formData,
                    userId: Session?.user?.id || '',
                    firstName: response?.data[0].firstName || "",
                    lastName: response?.data[0].lastName || "",
                    email: response?.data[0].email || "",
                    phone: response?.data[0].phone || "",
                    address: response?.data[0].address || "",
                    city: response?.data[0].city || "",
                    postalCode: response?.data[0].postalCode || "",
                    country: response?.data[0].country || "",

                })
            }
        })
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [deletePermission, setDeletePermission] = useState(false)
    useEffect(() => {
        if (cartProducts.length > 0 || deletePermission) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            setDeletePermission(false)

        }

    }, [cartProducts]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.cart.length > 0 && formData.userId === Session?.user?.id) {
            setIsLoading(true)

            await axios.post('/api/purchaseRequest', { ...formData }, {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
                }
            });
            setFormData({
                userId: '',
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                postalCode: "",
                country: "",
                cart: []
            });
            setDeletePermission(true)
            setCartProducts([])
            setShowMessage(true)
            setTimeout(() => setShowMessage(false)
                , 5000)
            setIsLoading(false)


        } else {
            alert('Your cart is empty')
        }
    }
    return (
        <>
            <NavBarInterface />
            <div className="min-h-screen mt-10 p-6 bg-gray-50">
                {!showMessage ? (
                    <form onSubmit={handleSubmit} className="max-w-3xl text-xs text-right sm:text-base mx-auto p-8 bg-white shadow-lg border rounded-lg">
                        <h2 className="md:text-3xl text-2xl font-bold mb-8 text-[#6bb41e]">تأكيد الطلبية</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    الاسم الأول
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 text-right outline-none rounded-lg shadow-sm p-3 focus:ring-[#6bb41e] focus:border-[#6bb41e] transition duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    اسم العائلة
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 text-right outline-none rounded-lg shadow-sm p-3 focus:ring-[#6bb41e] focus:border-[#6bb41e] transition duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                رقم الهاتف
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 text-right outline-none rounded-lg shadow-sm p-3 focus:ring-[#6bb41e] focus:border-[#6bb41e] transition duration-200"
                                required
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                العنوان
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 text-right outline-none rounded-lg shadow-sm p-3 focus:ring-[#6bb41e] focus:border-[#6bb41e] transition duration-200"
                                required
                            />
                        </div>
                  <label htmlFor='terms' className="text-xs">
                    أوافق على جميع{' '}
                    <Link href={'/conditions'} target="_blank" className="w-fit">
                      <span className="text-xs text-blue-500 mt-0 font-bold">الشروط والأحكام.</span>
                    </Link>
                  </label>
                        <input id='terms' required type="checkbox" className="mr-2" />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-4 block w-full bg-[#6bb41e] border-2 border-[#6bb41e] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#6bb41e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    جاري الإرسال ....
                                </span>
                            ) : (
                                'إتمام الطلب'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="animate-fadeIn">
                        <ThankYouCard />
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}