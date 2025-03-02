import React, { useState } from 'react'


function PackTemplate({price,title,description,img}) {
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md w-72">
           <h1 className="text-xl font-bold mb-4">{title}</h1>
           <img src={img} alt={title} className="w-48 h-48 object-cover rounded-md mb-4" />
           <p className="text-gray-600 text-center mb-4">{description}</p>
           <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-semibold mb-4">
             {price}
           </div>
           <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
             اشتري الآن
           </button>
    </div>
  )
}

function Packs() {
    const [packs, setPacks] = useState([
        {
            price: 100,
            title: "Pack 1",
            description: "This is the first pack",
            img: "https://via.placeholder.com/150"  
        },
        {
            price: 200,
            title: "Pack 2",
            description: "This is the second pack",
            img: "https://via.placeholder.com/150"          
        },
        {
            price: 300,
            title: "Pack 3",
            description: "This is the third pack",
            img: "https://via.placeholder.com/150"
        }])
    
  return (
    <>
      <h1 className='text-2xl font-bold text-center'>الباقات</h1>
    <div className='flex justify-center gap-5 p-2 items-center'>
        {packs.map((pack) => (      
            <PackTemplate key={pack.price} price={pack.price} title={pack.title} description={pack.description} img={pack.img} />
        ))}
    </div>
    </>
  )
}

export default Packs


