'use client'
import Footer from "@/components/interfaceComponents/Footer";
import NavBarInterface from "@/components/interfaceComponents/Nav-bar-interface";
import SideBarUserAccount from "@/components/interfaceComponents/sideBarUserAcount";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ThankYouCard from "@/components/ThankYouCard";
import Select from "react-select";

export async function getServerSideProps(context) {

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function UserAccount({ children }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false)
  const [putOrPost, setPutOrPost] = useState('POST')
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false)
  const [_id, set_Id] = useState('')
  const [passwordIsUpdated, setPasswordIsUpdated] = useState(false)
  const [dropDownCountriesList, setDropDownCountriesList] = useState([])
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
    userId: session?.user?.id || '',
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  })

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (password === '') {
        setMessage('Please fill in both fields.');
      } else {

        await axios.put('/api/passwordChanger', { password, _id: session?.user?.id }, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        })
        setPasswordIsUpdated(true)
        setTimeout(() => setPasswordIsUpdated(false)
          , 1000)
      }
    } catch {
      alert('error !! try again')
    }

  };

  useEffect(() => {
    getCountriesList()
    if (session) {
      axios.get('/api/address', {
        params: { userId: session?.user?.id }, headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
        }
      }).then((response) => {
        setFormData(response.data[0] || {
          userId: session?.user?.id || '',
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
        }); if (response.data[0]) { setPutOrPost('PUT'); set_Id(response.data[0]._id) }
      })
    }
  }, [])

  const handleChangeAddress = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('formData send', formData)
    try {
      setIsLoading(true)
      if (putOrPost === 'PUT') {
        await axios.put('/api/address', { ...formData, _id }, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        });
      } else {
        await axios.post('/api/address', formData, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        });
      }
      setShowMessage(true)
      setTimeout(() => setShowMessage(false)
        , 7000)
      setIsLoading(false)


    }
    catch {
      alert('error try again')
    }
  }


  return (
    <>
      <NavBarInterface />
      <div className="min-h-screen block md:grid md:grid-cols-12 justify-start pr-2 pb-2 mt-14">
        <div className="px-4 col-span-2 h-auto mb-10">
          <SideBarUserAccount session={session} />
        </div>
        <div className="flex-grow col-span-10 bg-white border-2">

          <div className={`mt-2  md:p-6 p-2 w-full`}>
            {children ? children :
              <div>
                <div className=" pt-6 px-6 flex justify-between">
                  <h1 className="">Hi ,{session?.user?.name}</h1>

                  <button className="flex gap-1 hover:text-yellow-900" onClick={() => signOut({ callbackUrl: '/' })}>
                    logout
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-2xl font-semibold mt-10  text-gray-800 mb-6">Change Password</h2>
                {!passwordIsUpdated ?
                  <div className="max-w-3xl text-xs sm:text-base mx-auto p-6 bg-white shadow-sm border rounded-lg">
                    <form onSubmit={handleChangePassword}>
                      <div className="flex flex-col sm:grid grid-cols-2 gap-6 ">
                        <div className="mb-4 ">
                          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={session?.user?.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 outline-none focus:text-black  cursor-not-allowed rounded-md focus:outline-none "
                            placeholder="Enter your new email"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 outline-none text-slate-400 focus:text-black rounded-md focus:outline-none  focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Enter your new password"
                            required
                          />
                        </div>

                      </div>
                      <button
                        type="submit"
                        className=" bg-yellow-500  py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none text-slate-400 focus:text-black focus:ring-2 focus:ring-yellow-400"
                      >
                        Change Password
                      </button>
                    </form>
                  </div>
                  :
                  <ThankYouCard role={"password"} />}

                <h2 className="text-2xl mt-10 font-semibold text-gray-800 mb-6">Change Address</h2>

                {!showMessage ?
                  <form onSubmit={handleSubmit} className="max-w-3xl text-xs sm:text-base mx-auto p-6 bg-white shadow-sm border rounded-lg">

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
                          disabled={!session}
                          onChange={handleChangeAddress}
                          className={`mt-1 block w-full border ${!session ? 'cursor-not-allowed' : 'cursor-default'} border-gray-300 outline-none text-slate-400 focus:text-black rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
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
                          disabled={!session}
                          value={formData.lastName}
                          onChange={handleChangeAddress}
                          className={`mt-1 block w-full border ${!session ? 'cursor-not-allowed' : 'cursor-default'} border-gray-300   outline-none text-slate-400 focus:text-black rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        disabled={!session}
                        value={formData.phone}
                        onChange={handleChangeAddress}
                        className={`mt-1 block w-full border ${!session ? 'cursor-not-allowed' : 'cursor-default'} border-gray-300 outline-none text-slate-400 focus:text-black rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
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
                        disabled={!session}
                        name="address"
                        value={formData.address}
                        onChange={handleChangeAddress}
                        className={`mt-1 block w-full border ${!session ? 'cursor-not-allowed' : 'cursor-default'} border-gray-300 outline-none text-slate-400 focus:text-black rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500`}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!session || isLoading}
                      className={`mt-2 block w-full ${!session ? 'cursor-not-allowed' : 'cursor-default'}  bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    >
                      {isLoading ? 'Sending ....' : 'Change Address'}
                    </button>
                  </form>
                  :
                  <div>
                    <ThankYouCard role={'address'} />
                  </div>
                }
              </div>

            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
