"use client"
import { CartContext } from '@/context/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import formatCurrency from '@/components/formatCurrency';
import Etoiles from '@/components/rating';

// Component to display a product card with relevant details
const ProductCard = ({ product, exchangeRate, currencyWanted }) => {

  // Calculate the total rating and the number of ratings for the product
  const totalRating = TotalRatingCalculator(product?.ratingDistribution);

  // Function to calculate the average rating and the number of ratings
  function TotalRatingCalculator(object) {
    const sommeRating = object?.un * 1 + object?.deux * 2 + object?.trois * 3 + object?.quatre * 4 + object?.cinque * 5;
    const numberRating = object?.un + object?.deux + object?.trois + object?.quatre + object?.cinque;
    if (numberRating === 0) {
      return { averageRating: 0, numberRating: 0 };
    }
    const averageRating = sommeRating / numberRating;
    return { averageRating, numberRating };
  }

  // Context to manage cart state
  const { setCartProducts, cartProducts } = useContext(CartContext);

  // State to handle animation for adding to the cart
  const [animation, setAnimation] = useState(false);

  // Timer to reset the animation after 1 second
  const timer = setTimeout(() => {
    setAnimation(false);
  }, 1000);

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    const existingProductIndex = cartProducts.find((item) => item.id === product._id);
    if (existingProductIndex) {
      // Do nothing if the product is already in the cart
    } else {
      // Add the product to the cart if it doesn't exist
      const newProduct = {
        id: product._id,
        title: product.title,
        price: product.price,
        productProperties: {},
        image: product.images[0],
        totalPrice: product.price,
        discountPercentage: product?.promotionsOrDiscounts[0]?.percentage || 0,
        discountQuantity: product?.promotionsOrDiscounts[0]?.quantity || 0,
        quantity: 1, // Default quantity is 1
      };
      setAnimation(true);
      clearTimeout(timer);
      setCartProducts([...cartProducts, newProduct]);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
      }
    }
  };

  return (
    <div className="border max-w-64 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      {/* Product image */}
      <div className='rounded-t-lg flex justify-center items-center'>
        <Link href={'/product/' + product._id}>
          <div className='w-52 h-52 relative'>
            <Image
              src={product?.images[0] ? product?.images[0] : '/No_Image_Available.jpg'}
              alt={product?.title}
              quality={70}
              fill
              loading='lazy'
              className="object-contain rounded-t-lg"
            />

            {/* Animation overlay image */}
            <Image
              src={product?.images[0] ? product?.images[0] : '/No_Image_Available.jpg'}
              alt={product?.title}
              quality={70}
              fill
              loading="lazy"
              className={animation ? "object-contain z-50 absolute bg-cover inset-0 rounded-t-lg animated" : "object-contain z-30 hidden absolute inset-0 rounded-t-lg"}
            />
          </div>
        </Link>
      </div>

      <div className="mt-4">
        {/* Product title */}
        <Link href={'/product/' + product._id}>
          <h3 className="text-lg text-right font-semibold line-clamp-2 text-gray-800">{product?.title}</h3>
        </Link>

        {/* Product price and discount */}
        <div className='flex justify-end gap-2 items-end'>
          <p className="text-gray-950 mt-2">
            {formatCurrency({ number: exchangeRate != null ? product?.price * exchangeRate : product?.price, currencySymbol: currencyWanted })}
          </p>
          {product?.discountPrice &&
            <p
              className="text-gray-500 mb-[2.5px] line-through text-xs mt-2 relative inline-block"
              style={{ width: 'fit-content', textDecorationThickness: '1.5px', textDecorationOffset: '2px' }}
            >
              {formatCurrency({ number: exchangeRate != null ? product?.discountPrice * exchangeRate : product?.discountPrice, currencySymbol: currencyWanted })}
            </p>
          }
        </div>

        {/* Product rating */}
        <div className='w-full flex items-center gap-3 justify-end'>
          <Etoiles number={product.rating} />
          <p className='text-lg text-slate-500'>({totalRating.numberRating ? totalRating.numberRating : 0})</p>
        </div>

        {/* Add to cart button */}
        <button
          className="mt-4 w-full bg-black flex justify-around items-center text-white py-2 border-black rounded-lg border-2 hover:text-black hover:bg-white transition-colors duration-300"
          onClick={() => addToCart(product)}
        >
           <FaCartShopping className={animation ? 'animate-bounce' : ''} size={25} />اشتري الآن
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
