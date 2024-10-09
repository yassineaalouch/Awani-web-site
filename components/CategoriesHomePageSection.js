// import Image from "next/image"
// import Link from "next/link"
// import { FaArrowLeft } from "react-icons/fa6"

// function CategoriesHomePageSection() {
//   let list = [1,2,3,4,5,6,7,8,9]
//   return (
//     <div className="w-[88%] mb-5 m-auto">
//       {/* had lblassa fiha ghir l3onwan */}
//       <div className="w-full py-5 mb-2 mt-6 flex justify-end">
//           <div className="text-right">
//             <div className="border-r-[15px] text-sm pr-2 mb-2 border-black">
//               الصنف 
//             </div>
//             <div className="text-2xl">
//               تصفح حسب الفئة  
//             </div>
//           </div>
//       </div>

//     {/* had lblassa fihha les carts dyal les categories */}
//     <div className="flex justify-between items-center">
//       {/* had div fiha dak sahm li fjanblisr */}
//         <div>
//           <button className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center">
//             <FaArrowLeft size={20} className={`text-slate-700 transition-all hover:scale-110 duration-300`} />
//           </button>
//         </div>
//     {/* hna kayn les categories  */}
//         <div className="w-ful mx-1 overflow-auto gap-10 scrollBarNon flex items-center justify-between">
//           {list.map((ele)=>(
//             <div key={ele} className="min-w-40 flex flex-col justify-center items-center gap-3 border-slate-500/80 border-2 rounded-md p-5">
//               <Link href={'/shope'}>
//                 <Image src='/No_Image_Available.jpg' alt="No_Image_Available" className="w-[100%]" width={100} height={50} quality={60} loading="lazy" />
//                 <p className="text-center"> title</p>
//               </Link>
//             </div>
//           ))
//           }
//         </div>
//       {/* had div fiha dak sahm li fjanblisr */}
//         <div>
//           <button className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center">
//             <FaArrowLeft size={20} className={`text-slate-700 rotate-180 transition-all hover:scale-110 duration-300`} />
//           </button>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default CategoriesHomePageSection
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

function CategoriesHomePageSection() {
  const [currentIndex, setCurrentIndex] = useState(0); // L'index du slide actuel
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const visibleSlides = 3; // Nombre de slides visibles à la fois

  // Fonction pour passer au slide suivant
  const handleNext = () => {
    if (currentIndex < list.length - visibleSlides) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Fonction pour passer au slide précédent
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-[88%] mb-5 m-auto">
      {/* Section titre */}
      <div className="w-full py-5 mb-2 mt-6 flex justify-end">
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
            onClick={handlePrev}
            className="bg-white hover:scale-110 transition-all duration-300 border-slate-400 border size-8 rounded-full flex justify-center items-center"
            disabled={currentIndex === 0}
          >
            <FaArrowLeft size={20} className="text-slate-700 transition-all hover:scale-110 duration-300" />
          </button>
        </div>

        {/* Slides des catégories */}
        <div className="w-full mx-1 overflow-hidden relative">
          <div
            className="flex gap-10 items-center transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
          >
            {list.map((ele) => (
              <div key={ele} className="min-w-[30%] flex flex-col justify-center items-center gap-3 border-slate-500/80 border-2 rounded-md p-5">
                <Link href="/shope">
                  <Image
                    src="/No_Image_Available.jpg"
                    alt="No_Image_Available"
                    className="w-[100%]"
                    width={100}
                    height={50}
                    quality={60}
                    loading="lazy"
                  />
                  <p className="text-center">title</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton suivant */}
        <div>
          <button
            onClick={handleNext}
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
