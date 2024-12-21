import React, { useEffect, useState } from 'react';
import CustomBarChart, { CustomBarChartCercle, Cercle } from './graph';
import axios from 'axios';

export default function DashboardDesign() {
  const [usersList, setUsersList] = useState([])
  const [usersNumber, setUsersNumber] = useState('0')
  const [productsList, setProductsList] = useState([])
  const [purchasesListCountries, setPurchasesListCountries] = useState([])
  const [purchasesListStatus, setPurchasesListStatus] = useState([])
  const [totalYear, setTotalYear] = useState('0')
  const [numberOfProducts, setNumberOfProducts] = useState('0')
  const aggregateList = (list) => {
    return list.reduce((acc, current) => {
      const existingEntry = acc.find(entry => entry.name === current.name);

      if (existingEntry) {
        // Si la date existe déjà, on augmente le nombre de répétitions (pu)
        existingEntry.pu += 1;
      } else {
        // Si c'est une nouvelle date, on ajoute un nouvel objet avec un compteur pu = 1
        acc.push({
          name: current.name,
          pu: 1
        });
      }

      return acc;
    }, []);
  };

  useEffect(() => {

    //fech Data from database
    const request1 = axios.get('/api/UserHandler', {
      params: { role: 'statistics' }, headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }
    });
    const request2 = axios.get('/api/purchaseRequest', {
      params: { role: 'statistics' }, headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }
    }).catch(errors => {
      alert(errors)
    });
    const request3 = axios.get('/api/products', {
      params: { role: 'statistics' }, headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }
    });

    axios.all([request1, request2, request3])
      .then(axios.spread((response1, response2, response3) => {
        setTotalYear(response2.data.map(ele => ele.finalePrice).reduce((a, b) => a + b, 0))
        setUsersNumber(response1.data.length)
        setUsersList(aggregateList(response1.data.map((ele) => {
          const date = ele?.createdAt?.split('T')[0];
          return { name: date ? date : '000', pu: 1 };
        })))
        setNumberOfProducts(response3.data)
        // console.log('hi', aggregateList(response1.data.map((ele) => {
        //   const date = ele?.createdAt?.split('T')[0];
        //   return { name: date ? date : '000', pu: 1 };
        // })))

        const countryCounts = response2.data.reduce((acc, item) => {
          const countryName = item?.country || 'Unknown'; // On s'assure que le pays est défini
          acc[countryName] = (acc[countryName] || 0) + 1; // Incrémente la valeur ou initialise à 1
          return acc;
        }, {});
        // On convertit l'objet en un tableau de la forme { name: countryName, repetition: count }
        const formattedList = Object.keys(countryCounts).map((country) => ({
          name: country,
          repetition: countryCounts[country]
        }));
        setPurchasesListCountries(formattedList)
        // console.log('response3',response3)

        const Status = response2.data.reduce((acc, item) => {
          const StatusName = item?.status || 'Unknown'; // On s'assure que le pays est défini
          acc[StatusName] = (acc[StatusName] || 0) + 1; // Incrémente la valeur ou initialise à 1
          return acc;
        }, {});
        // On convertit l'objet en un tableau de la forme { name: countryName, repetition: count }
        const formattedListStatusName = Object.keys(Status).map((country) => ({
          name: country,
          repetition: Status[country]
        }));
        setPurchasesListStatus(formattedListStatusName)


      }))
      .catch(errors => {
      });
  }, [])
  const data = [

    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400, b: { b: 2182, color: "#ffbb28" } },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210, b: { b: 2285, color: "#ffbb28" } },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290, b: { b: 485, color: "#ffbb28" } },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000, b: { b: 2286, color: "#ffbb28" } },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181, b: { b: 2218, color: "#ffbb28" } },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500, b: { b: 2256, color: "#ffbb28" } },
    { name: 'kkk', uv: 2390, pv: 3000, amt: 5050, b: { b: 22587, color: "#ffbb28" } },

  ];

  return (
    <div className="p-6  min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Orders This Year */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Orders This Year</h3>
          <p className="text-2xl font-bold text-blue-600">{totalYear}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Number of products</h3>
          <p className="text-2xl font-bold text-yellow-600">{numberOfProducts}</p>
        </div>

        {/* New Users */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Users</h3>
          <p className="text-2xl font-bold text-green-600">{usersNumber}</p>
        </div>

      </div>
      <div className='grid mt-10 gap-2 grid-cols-2 md:grid-cols-3'>
        <div className='col-span-3 md:col-span-2 bg-zinc-100'>
          <Cercle title={'countries orders'} data={purchasesListCountries} />
        </div>
        <div className='bg-zinc-100 col-span-3 md:col-span-1'>
          <Cercle title={'Order status'} data={purchasesListStatus} />
        </div>
        <div className='bg-slate-100 pb-12 max-h-96 col-span-3' >
          <CustomBarChartCercle title={'New users'} data={usersList} />
        </div>
      </div>
    </div>
  );
}
