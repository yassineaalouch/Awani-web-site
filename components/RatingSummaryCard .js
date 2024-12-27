import { useRouter } from "next/router";

const RatingSummaryCard = (ratingList) => {
  const router = useRouter();
  const { pathname } = router;

  const ratingDistribution = {
    5: ratingList?.cinque || ratingList?.ratingList?.cinque,
    4: ratingList?.quatre || ratingList?.ratingList?.quatre,
    3: ratingList?.trois || ratingList?.ratingList?.trois,
    2: ratingList?.deux || ratingList?.ratingList?.deux,
    1: ratingList?.un || ratingList?.ratingList?.un,
  };

  const totalRatings = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className='border-2 h-full border-gray-300 rounded-lg bg-white p-6 shadow-lg mx-auto'>
      {!pathname.includes('/products') && (
        <h1 className='md:text-xl text-lg font-semibold text-gray-800 text-right mb-4'>تقييمات المستخدمين </h1>
      )}

      <div className="">
        {Object.keys(ratingDistribution).reverse().map((rating) => (
          <div key={rating} className='grid grid-cols-12 gap-2 md:gap-0 items-center'>

            <span className='ml-2 col-span-3 md:col-span-2 gap-4 text-sm md:text-base grid grid-cols-2 md:gap-2 text-gray-600'>
              <div>
                {Math.round((ratingDistribution[rating] / totalRatings) * 100)
                  ? Math.round((ratingDistribution[rating] / totalRatings) * 100)
                  : '0'}%
              </div>
              <div>{ratingDistribution[rating]}</div>
            </span>

            <div className='w-full bg-gray-200 col-span-6 md:col-span-7 rounded-full mr-4' style={{ direction: 'rtl' }}>
              <div
                className={
                  Math.round((ratingDistribution[rating] / totalRatings) * 100)
                    ? 'bg-yellow-500 h-2 rounded-full'
                    : 'bg-gray-200 h-2 rounded-full'
                }
                style={{ width: `${(ratingDistribution[rating] / totalRatings) * 100}%` }}
              />
            </div>
            <span className='text-yellow-500 px-1 col-span-3 flex'>
              {/* Inverser l'ordre des étoiles pour qu'elles soient remplies de droite à gauche */}
              {[...Array(5 - Number(rating))].map((_, i) => (
                <svg key={i} className='h-5 inline text-gray-300' fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.455L24 9.588l-6 5.857L19.336 24 12 19.765 4.664 24 6 15.445 0 9.588l8.332-1.546z" />
                </svg>
              ))}
              {[...Array(Number(rating))].map((_, i) => (
                <svg key={i} className='h-5 inline' fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.455L24 9.588l-6 5.857L19.336 24 12 19.765 4.664 24 6 15.445 0 9.588l8.332-1.546z" />
                </svg>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummaryCard;
