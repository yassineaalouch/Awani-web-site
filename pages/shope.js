import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import ProductCart from "@/interfaceComponents/ProductCart";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/cartContext";
import { FaCartShopping } from "react-icons/fa6";
import ProductFilterBar from "@/components/Filter";
import { useEffect,useState } from "react";
import { Category } from "@/models/Category";
import axios from "axios";

export async function getServerSideProps() {
    await mongooseConnect()
    const productList = await Product.find({}).populate('category').lean();

    return {
        props: {
            productList: JSON.parse(JSON.stringify(productList.reverse())),
        },
    };
}

export default function Shop({ productList }) {
    const {cartProducts,setCartProducts} = useContext(CartContext)
    const [categories,setCategories] = useState([])
    const [productListFilter,setProductListFilter] = useState (productList)
    useEffect(()=>{
        fitchData()
        getGeolocation()
    },[])
    
    function ImportFilterValues(number){
        const list = productList.filter(product => {
            return (
              (number.category=='All'||number.category===''||product?.category?.name === number.category)&&
              (!number.priceRange||product.price <= number.priceRange)&&
              (!number.rating||product?.rating >= number.rating)

            )
        })
        if(number.sortOrder=='price-desc'){
            const sortedProducts = list.sort((a, b) => b.price - a.price);
            setProductListFilter(sortedProducts)
        }else if(number.sortOrder=='price-asc'){
            const sortedProducts = list.sort((a, b) => a.price - b.price);
            setProductListFilter(sortedProducts)
        }else if(number.sortOrder=='rating-desc'){
            const sortedProducts = list.sort((a, b) => b.rating - a.rating);
            setProductListFilter(sortedProducts)
        }else{
            setProductListFilter(list)
        }
        

    }
    
    async function fitchData(){
        const response = await axios.get('/api/categories').then((response)=>{setCategories(response.data.map((ele)=>(ele.name)))})
    }
    const [data,setData] = useState({})
    async function getGeolocation() {
        try {
            const response = await axios.get(`/api/getGeolocation`);
            const setData = response.data; // Extract the data from the response
            console.log('Geolocation data:', response);

            return setData; // Return the geolocation data
        } catch (error) {
            console.error('Error fetching geolocatio4n:', error);
            return null; // Return null if there’s an error
        }
    }

    return (
        <>
            <NavBarInterface />
            <div className="mt-9">
               ip: {data.ip} country :{data.country}
            </div>
            <div className="mt-12"> 
                <ProductFilterBar ImportFilterValues={ImportFilterValues} categories={categories}/>
            </div>
            <div className="min-h-screen pb-8 flex justify-center ">
                <div className="flex h-fit justify-center gap-2 flex-wrap md:grid sm:grid-cols-3 lg:grid-cols-4">
                    {productListFilter.map((element) => (
                        <ProductCart key={element._id} product={element} />
                    ))}
                </div>
            </div>
            <Link href='/cart' className="bg-yellow-500 border-red-600 border-2 hover:bg-yellow-600 flex p-2 rounded-full text-white fixed right-5 bottom-5 ">
                <FaCartShopping size={30} className=" relative z-40"/>
                <div className="bg-red-600 text-sm px-2 py-1 rounded-full absolute bottom-7 left-7">
                    {cartProducts.length}
                </div>
            </Link>
            <Footer />
        </>
    );
}

