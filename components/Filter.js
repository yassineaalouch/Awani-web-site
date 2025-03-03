import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { FilterLocalContext } from "@/context/FilterLocalContext";

function ProductFilterBar({ categories, ImportFilterValues }) {

    const [categoryFilter, setCategoryFilter] = useState('');
    const { filterLocal, setFilterLocal } = useContext(FilterLocalContext)

    useEffect(() => {
        if (filterLocal.category != 'All' && filterLocal.category != undefined) {
            setCategoryFilter(filterLocal.category)
        } else {
            setFilterLocal({
                category: '',
                price: '',
                rating: '',
                order: ''
            })
        }
    }, [])

    return (
        <div className='bg-white border-b-2 border-gray-200 w-screen py-4 px-6 mb-2 flex items-center justify-between shadow-sm'>
            <div className="overflow-auto scrollBarNon mr-2 flex lg:justify-center lg:w-[88%]">
                <div className="flex items-center justify-between gap-7 min-w-max">
                    {/* Category Filter */}
                    <div className="flex flex-row-reverse gap-2 items-center">
                        <label className="text-gray-600 text-sm">: الفئة</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="border border-[#6bb41e] text-center rounded-lg px-3 py-1.5 text-sm text-gray-800"
                        >
                            <option value="All">الجميع</option>
                            {categories?.length > 0 && categories.map(c => (
                                <option className={`ml-${c.grad}`} key={c} value={c._id}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Filter Button */}
            <button
                onClick={() => {
                    setFilterLocal({
                        category: categoryFilter,
                        price: '',
                        rating: '',
                        order: ''
                    });
                    ImportFilterValues({ priceRange: '', categoryFilter, sortOrder: '', rating: '' })
                }}
                className="bg-[#6bb41e] border-white border-2 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:text-[#6bb41e] hover:border-[#6bb41e] hover:bg-white transition duration-150"
            >
                يبحث
            </button>
        </div>
    );
}

export default ProductFilterBar;
