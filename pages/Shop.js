import Footer from "@/components/interfaceComponents/Footer";
import NavBarInterface from "@/components/interfaceComponents/Nav-bar-interface";
import ProductCart from "@/components/interfaceComponents/ProductCart";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import ProductFilterBar from "@/components/Filter";
import { useEffect, useState } from "react";
import { Category } from "@/models/Category";
import axios from "axios";
import { converterCurrency } from "@/components/currencyConverter";
import BlackBarTop from "@/components/blackBarTop";
import { FilterLocalContext } from "@/context/FilterLocalContext";
import { FaArrowRight } from "react-icons/fa";

export async function getStaticProps() {
    await mongooseConnect()
    const productList = await Product.find({}).populate('category').limit(30).lean();

    return {
        props: {
            productList: JSON.parse(JSON.stringify(productList.reverse())),
        },
    };
}

export default function Shop({ productList }) {
    const { cartProducts, setCartProducts } = useContext(CartContext)
    const [categories, setCategories] = useState([])
    const [productListFilter, setProductListFilter] = useState(productList)
    const { conversionRate, currencyWanted, } = useContext(converterCurrency)
    const [rateOfChange, setRateOfChange] = useState(null)
    const { filterLocal } = useContext(FilterLocalContext)
    const [query, setQuery] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Pour suivre le nombre total de pages

    useEffect(() => {
        setRateOfChange(conversionRate[currencyWanted])
    }, [currencyWanted])
    useEffect(() => {
        fitchData()
        if (filterLocal.category != 'All' && filterLocal.category != undefined) {
            ImportFilterValues({ priceRange: '', categoryFilter: filterLocal.category, sortOrder: '', rating: '' })
        }
    }, [])

    async function ImportFilterValues(number, page = 1) {
        let list = [];

        const filters = {
            category: filterLocal.category,
            price: filterLocal.price,
            rating: filterLocal.rating,
            page: page, // Inclure la page dans les filtres
            limit: 5    // Nombre d'éléments par page
        };
        setQuery(filters);
        setCurrentPage(page); // Mettre à jour la page actuelle
        console.log('filters', filters)
        await axios.get('/api/products', {
            params: filters,
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`
            }
        }).then((res) => {
            list = res.data.products;
            setTotalPages(res.data.totalPages); // Mettre à jour le nombre total de pages

            if (filterLocal.order === 'price-desc') {
                list.sort((a, b) => b.price - a.price);
            } else if (filterLocal.order === 'price-asc') {
                list.sort((a, b) => a.price - b.price);
            } else if (filterLocal.order === 'rating-desc') {
                list.sort((a, b) => b.rating - a.rating);
            }

            setProductListFilter(list);
        }).catch((error) => {
            console.error('Error fetching products:', error);
        });
    }
    function handleNextPage() {
        if (currentPage < totalPages) {
            ImportFilterValues(query, currentPage + 1); // Passer à la page suivante
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            ImportFilterValues(query, currentPage - 1); // Revenir à la page précédente
        }
    }

    async function fitchData() {
        const response = await axios.get('/api/categories', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        }).then((response) => { setCategories(response.data.map((ele) => (ele.name))) })
    }

    return (
        <>
            <BlackBarTop />
            <NavBarInterface classNameGlobal={' mt-12'} classNameMenuUserIcon={' !top-16'} />
            <div className="">
                <ProductFilterBar ImportFilterValues={ImportFilterValues} categories={categories} />
            </div>
            <div className="min-h-screen pb-8 flex flex-col items-center justify-between ">
                <div className="flex h-fit justify-center gap-2 flex-wrap md:grid sm:grid-cols-3 lg:grid-cols-4">
                    {productListFilter.length > 0 && productListFilter.map((element) => (
                        <ProductCart key={element._id} currencyWanted={currencyWanted} exchangeRate={rateOfChange} product={element} />
                    ))}
                </div>
                <div className="w-full mt-8 flex gap-2 justify-center items-center">
                    <button
                        onClick={handlePreviousPage}
                        className={`border-2 border-black rounded-md py-1 px-3 hover:text-white hover:bg-black transition-all duration-300 rotate-180 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === 1} // Désactiver le bouton si on est sur la première page
                    >
                        <FaArrowRight />
                    </button>
                    <div className="px-3 text-xl">
                        {currentPage} / {totalPages}
                    </div>
                    <button
                        onClick={handleNextPage}
                        className={`border-2 border-black rounded-md py-1 px-3 hover:text-white hover:bg-black transition-all duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === totalPages} // Désactiver le bouton si on est sur la dernière page
                    >
                        <FaArrowRight />
                    </button>
                </div>

            </div>
            <Footer />
        </>
    );
}

