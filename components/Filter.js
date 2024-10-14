import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CategoryContext } from "@/components/categoryContext";

function ProductFilterBar({categories,ImportFilterValues}) {

const [categoryFilter, setCategoryFilter] = useState('');
const [priceRange, setPriceRange] = useState('');
const [rating, setRating] = useState('');
const [sortOrder, setSortOrder] = useState('');
const {category, setCategory } = useContext(CategoryContext)

useEffect(()=>{
    if(category!='All'&&category!=undefined){
        setCategoryFilter(category)
    }
},[])

return ( 
<div className=' bg-white border-b-2  border-gray-200 w-screen py-4 px-6 mb-2 flex items-center justify-between shadow-sm '>
    <div className="overflow-auto scrollBarNon mr-2 flex lg:justify-center  lg:w-[88%] ">
        
        <div className="flex items-center justify-between gap-7 min-w-max ">

            {/* Category Filter */}
            <div className="flex flex-row-reverse gap-2 items-center">
            <label className="text-gray-600 text-sm" >: الفئة</label>
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 text-center rounded-lg px-3 py-1.5 text-sm text-gray-800"
            >
                    <option value="All">الجميع</option>
                    {categories?.length > 0 && categories.map(c=> (
                            <option className={`ml-${c.grad}`} key={c} value={c._id}>{c} </option>
                    ))}
            </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex flex-row-reverse gap-2 items-center ">
                <label className="text-gray-600 text-sm">: السعر الأقصى</label>
                <input
                    value={priceRange}
                    type='tel'
                    onChange={(e) => {setPriceRange(e.target.value)}}
                    className="border-2 px-1 py-[0.2rem] rounded-lg"
                />

            </div>

            {/* Rating Filter */}
            <div className="flex items-center flex-row-reverse gap-2">
            <label className="text-gray-600 text-sm">: تصنيف</label>
            <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800 text-center"
            >
                <option value="All">الجميع</option>
                <option value="4">نجوم وما فوق  4</option>
                <option value="3">3 نجوم وما فوق</option>
                <option value="2">2 نجوم وما فوق</option>
                <option value="1">1 نجوم وما فوق</option>
            </select>
            </div>

            {/* Sort By Filter */}
            <div className="flex items-center flex-row-reverse gap-2">
            <label className="text-gray-600 text-sm">: الترتيب حسب</label>
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 text-center rounded-lg px-3 py-1.5 text-sm text-gray-800"
            >
                <option value="">الجميع</option>
                <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                <option value="price-desc">السعر: من الأعلى إلى الأدنى</option>
                <option value="rating-desc">أعلى تقييم</option>
                <option value="newest">أحدث المنتجات</option>
            </select>
            </div>
        </div>

        </div>


    {/* Filter Button */}
    <button
    onClick={() => {ImportFilterValues({priceRange,categoryFilter,sortOrder,rating})}}
    className="bg-black border-white border-2 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:text-black hover:border-black hover:bg-white transition duration-150"
    >
    يبحث
    </button>
</div>
  );
}

export default ProductFilterBar;
