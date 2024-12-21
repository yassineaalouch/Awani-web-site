import { useRef } from "react";
import ProductCard from "@/components/interfaceComponents/ProductCart";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FilterLocalContext } from "../context/FilterLocalContext";
import { useContext } from "react";
import Link from "next/link";


function ProductsHomePageSection({ productList, petitTitre, grandTitre, categoryTitre, page }) {
  const { setFilterLocal } = useContext(FilterLocalContext)

  // Référence pour accéder à l'élément contenant les produits
  const productsRef = useRef(null);

  // Fonction pour faire défiler vers la gauche
  const scrollLeft = () => {
    productsRef.current.scrollBy({
      left: -300, // Défile de 300px vers la gauche
      behavior: "smooth", // Défilement fluide
    });
  };

  // Fonction pour faire défiler vers la droite
  const scrollRight = () => {
    productsRef.current.scrollBy({
      left: 300, // Défile de 300px vers la droite
      behavior: "smooth", // Défilement fluide
    });
  };

  //  Show more function
  function ShowMore() {
    setFilterLocal((prevFilter) => ({
      ...prevFilter,
      category: categoryTitre,
    }));
  }

  return (
    <div className="md:w-[88%] mb-5 m-auto">
      {/* Section du titre */}

      {page != 'productPage' &&
        <div className="w-full justify-between items-center px-4 md:px-0 py-5 mb-2 mt-6 flex">
          <div>
            <Link
              href={'/Shop'}
              onClick={() => ShowMore()}
              className="px-3 bg-black flex justify-around items-center text-white py-2 border-black rounded-lg border-2 hover:text-black hover:bg-white transition-colors duration-300"
            >
              عرض الكل
            </Link>
          </div>
          <div className="text-right">
            <div className="border-r-[15px] text-lg pr-2 mb-2 border-black">
              {petitTitre}
            </div>
            <div className="text-3xl">
              {grandTitre}
            </div>
          </div>
        </div>
      }

      {/* Section des produits avec les flèches */}
      <div className="flex justify-between items-center">
        {/* Flèche vers la gauche */}
        <div>
          <button
            onClick={scrollLeft}
            className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center"
          >
            <FaArrowLeft
              size={20}
              className="text-slate-700 transition-all hover:scale-110 duration-300"
            />
          </button>
        </div>

        {/* Liste des produits */}
        <div
          ref={productsRef}
          className="w-full h-fit mx-1 overflow-auto gap-10 scrollBarNon flex items-center justify-between"
        >
          {productList.map((ele, index) => (
            <div key={index} className="flex flex-col my-6 hover:scale-110 transition-all duration-300 justify-center items-center gap-3">
              <ProductCard product={ele} />
            </div>
          ))}
        </div>

        {/* Flèche vers la droite */}
        <div>
          <button
            onClick={scrollRight}
            className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center"
          >
            <FaArrowRight
              size={20}
              className="text-slate-700 transition-all hover:scale-110 duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsHomePageSection;
