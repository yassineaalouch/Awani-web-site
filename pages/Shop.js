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
import { converterCurrency } from "@/components/currencyConverter";
import BlackBarTop from "@/components/blackBarTop";
import { CategoryContext } from "@/components/categoryContext";
import { FaArrowRight } from "react-icons/fa";

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
    const {conversionRate,currencyWanted,} = useContext(converterCurrency)
    const [rateOfChange,setRateOfChange] = useState(null)
    const {category, setCategory } = useContext(CategoryContext)

    useEffect(()=>{
        setRateOfChange(conversionRate[currencyWanted])
    },[currencyWanted])
    useEffect(()=>{
        fitchData()
        if(category!='All'&&category!=undefined){
            ImportFilterValues({priceRange:'',categoryFilter:category,sortOrder:'',rating:''})
        }
    },[]) 
    
    function ImportFilterValues(number){
        const list = productList.filter(product => {

            return (
              (number.categoryFilter=='All'||number.categoryFilter===''||product?.category?.name === number.categoryFilter)&&
              (!number.priceRange||(rateOfChange? product.price*rateOfChange:product.price) <= number.priceRange)&&
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
        const response = await axios.get('/api/categories',{ headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }}).then((response)=>{setCategories(response.data.map((ele)=>(ele.name)))})
    }
    
    return (
        <>
            <BlackBarTop/>
            <NavBarInterface classNameGlobal={' mt-12'} classNameMenuUserIcon={' !top-16'}/>
            <div className=""> 
                <ProductFilterBar ImportFilterValues={ImportFilterValues} categories={categories}/>
            </div>
            <div className="min-h-screen pb-8 flex flex-col items-center justify-between ">
                <div className="flex h-fit justify-center gap-2 flex-wrap md:grid sm:grid-cols-3 lg:grid-cols-4">
                    {productListFilter.map((element) => (
                        <ProductCart key={element._id} currencyWanted={currencyWanted} exchangeRate={rateOfChange} product={element} />
                    ))}
                </div>
                <div className=" w-full mt-8 flex gap-2 justify-center items-center">
                    <button className="border-2 border-black rounded-md py-1 px-3 hover:text-white hover:bg-black transition-all duration-300 rotate-180">
                        <FaArrowRight/>
                    </button>
                    <div className="px-3 text-xl">
                        1
                    </div>
                    <button className="border-2 border-black rounded-md py-1 px-3 hover:text-white hover:bg-black transition-all duration-300 ">
                        <FaArrowRight/>
                    </button>
                </div>
            </div>
            <Link href='/cart' className=" border-black bg-white border-2 hover:bg-black hover:text-white transition-all duration-300 flex p-2 rounded-full text-black fixed right-5 bottom-5 ">
                <FaCartShopping size={30} className=" relative z-40"/>
                <div className="bg-red-600 text-sm p-[3px] text-[30px] text-white font-bold rounded-full absolute bottom-7 left-7">
                    {cartProducts.length}
                </div>
            </Link>
            <Footer />
        </>
    );
}

