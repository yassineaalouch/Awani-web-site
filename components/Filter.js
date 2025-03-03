import { useEffect, useState } from "react";
import { useContext } from "react";
import { FilterLocalContext } from "@/context/FilterLocalContext";
import Link from "next/link";
import Image from "next/image";

function ProductFilterBar({ categories, ImportFilterValues }) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const { filterLocal, setFilterLocal } = useContext(FilterLocalContext);
  const list = [
    { img: "/traditional-moroccan-tagine.avif", text: "تقليدي" },
    { img: "/fastFood.jpg", text: "وجبات سريعة" },
    { img: "/salad.avif", text: "سلطة" },
    { img: "/croissan.avif", text: "مخبوزات " },
    { img: "/jus.jpg", text: "عصائر " },
  ];
  useEffect(() => {
    if (filterLocal.category != "All" && filterLocal.category != undefined) {
      setCategoryFilter(filterLocal.category);
    } else {
      setFilterLocal({
        category: "",
        price: "",
        rating: "",
        order: "",
      });
    }
  }, []);

  return (
    <div className="bg-white border-b-2 border-gray-200 w-screen py-4 px-6 mb-2 flex items-center justify-between shadow-sm">
      <div className="w-full flex justify-center">
        <div className="flex items-center justify-between gap-7 min-w-max">
          {/* Category Filter */}
          <div className="flex flex-row-reverse gap-3 md:gap-10 items-center">
            {list.map((ele, index) => (
              <div
                key={index}
                onClick={() => {
                  setCategoryFilter(ele.text);
                  setFilterLocal({
                    category: categoryFilter,
                    price: "",
                    rating: "",
                    order: "",
                  });
                  ImportFilterValues({
                    priceRange: "",
                    categoryFilter,
                    sortOrder: "",
                    rating: "",
                  });
                }}
                className="cursor-pointer w-11 md:w-16 p-1 flex flex-col justify-center items-center gap-3 border-[#6bb41e] border-2 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#6bb41e]/20 transition-all duration-300 bg-white"
              >
                <div
                  onClick={() => {
                    setFilterLocal({
                      category: ele.text,
                      price: null,
                      rating: null,
                      order: null,
                    });
                  }}
                 className="flex flex-col items-center"
                >
                  <Image
                    src={ele.img || "/No_Image_Available.jpg"}
                    alt="No_Image_Available"
                    className="w-full rounded-full object-contain"
                    width={100}
                    height={100}
                    quality={60}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
            {/* <label className="text-gray-600 text-sm">: الفئة</label> */}
            {/* <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="border border-[#6bb41e] text-center rounded-lg px-3 py-1.5 text-sm text-gray-800"
                        >
                            <option value="All">الجميع</option>
                            {categories?.length > 0 && categories.map(c => (
                                <option className={`ml-${c.grad}`} key={c} value={c._id}>{c}</option>
                            ))}
                        </select> */}
          </div>
        </div>
      </div>

      {/* Filter Button */}
      {/* <button
        onClick={() => {
          setFilterLocal({
            category: categoryFilter,
            price: "",
            rating: "",
            order: "",
          });
          ImportFilterValues({
            priceRange: "",
            categoryFilter,
            sortOrder: "",
            rating: "",
          });
        }}
        className="bg-[#6bb41e] border-white border-2 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:text-[#6bb41e] hover:border-[#6bb41e] hover:bg-white transition duration-150"
      >
        يبحث
      </button> */}
    </div>
  );
}

export default ProductFilterBar;
