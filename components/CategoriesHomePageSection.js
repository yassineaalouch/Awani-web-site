
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useRef } from "react";

function CategoriesHomePageSection() {
  const [currentIndex, setCurrentIndex] = useState(0); // L'index du slide actuel
  const list = [
    {img:'/categories/3ssara.png',text:'عصارة'},
    {img:'/categories/7kaka.png',text:'حكاكة '},
    {img:'/categories/electric.png',text:'كهرباء '},
    {img:'/categories/ghlay.png',text:'غلاي'},
    {img:'/categories/mos.png',text:'سكين '},
    {img:'/categories/tnjra.png',text:'طنجرة'},
  ]
  const visibleSlides = 3; // Nombre de slides visibles à la fois
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
  // Fonction pour passer au slide suivant


  return (
    <div className="w-full md:w-[88%] mb-5 m-auto">
      {/* Section titre */}
      <div className="w-full px-4 md:px-0 py-5 mb-2 mt-6 flex justify-end">
        <div className="text-right">
          <div className="border-r-[15px] text-sm pr-2 mb-2 border-black">الصنف</div>
          <div className="text-2xl">تصفح حسب الفئة</div>
        </div>
      </div>

      {/* Section des catégories */}
      <div className="flex justify-between items-center">
        {/* Bouton précédent */}
        <div>
          <button
            onClick={scrollLeft}
            className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center"
            disabled={currentIndex === 0}
          >
            <FaArrowLeft size={20} className="text-slate-700 transition-all hover:scale-110 duration-300" />
          </button>
        </div>

        {/* Slides des catégories */}
        <div className="w-full mx-1 overflow-hidden relative">
          <div
            ref={productsRef}
            className="flex gap-10 overflow-auto py-5 scrollBarNon items-center transition-transform duration-300"
          >
            {list.map((ele,index) => (
              <div key={index} className="min-w-20 flex flex-col justify-center items-center gap-3 border-slate-500/80 border-2 rounded-md p-5 hover:scale-110 transition-all duration-300">
                <Link href={"/shope/"+ele.text}>
                  <Image
                    src= {ele.img ||"/No_Image_Available.jpg"}
                    alt="No_Image_Available"
                    className="w-[100%] "
                    width={100}
                    height={50}
                    quality={60}
                    loading="lazy"
                  />
                  <p className="text-center">{ele.text}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton suivant */}
        <div>
          <button
            onClick={scrollRight}
            className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center"
            disabled={currentIndex >= list.length - visibleSlides}
          >
            <FaArrowLeft size={20} className="text-slate-700 rotate-180 transition-all hover:scale-110 duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesHomePageSection;
