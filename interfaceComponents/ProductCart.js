"use client"
import { CartContext } from '@/components/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import formatCurrency from '@/components/formatCurrency';
import Etoiles from '@/components/rating';


const ProductCard = ({ product, exchangeRate, currencyWanted }) => {


  const totalRating = TotalRatingCalculator(product?.ratingDistribution);

  // cette fonction katrj3 lik l3adad dyal nass li rataw lproduit o ta lmoyenne dyal rating
  function TotalRatingCalculator(object) {
    const sommeRating = object?.un * 1 + object?.deux * 2 + object?.trois * 3 + object?.quatre * 4 + object?.cinque * 5;
    const numberRating = object?.un + object?.deux + object?.trois + object?.quatre + object?.cinque;
    if (numberRating === 0) {
      return { averageRating: 0, numberRating: 0 };
    }
    const averageRating = sommeRating / numberRating;
    return { averageRating, numberRating };
  }

  const { setCartProducts, cartProducts } = useContext(CartContext)
  const [animation, setAnimation] = useState(false)
  const timer = setTimeout(() => {
    setAnimation(false)
  }, 1000);

  const addToCart = (product) => {
    const existingProductIndex = cartProducts.find((item) => item.id === product._id);
    if (existingProductIndex) {
    } else {
      // Si le produit n'existe pas dans le panier, ajoutez-le
      const newProduct = {
        id: product._id,
        title: product.title,
        price: product.price,
        productProperties: {},
        image: product.images[0],
        totalPrice: product.price,
        discountPercentage: product?.promotionsOrDiscounts[0]?.percentage || 0,
        discountQuantity: product?.promotionsOrDiscounts[0]?.quantity || 0,
        quantity: 1,  // Commencez avec une quantité de 1
      };
      setAnimation(true)
      clearTimeout(timer);
      setCartProducts([...cartProducts, newProduct]);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
      }
    }
  };

  return (
    <div className="border max-w-64 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div className='rounded-t-lg flex justify-center items-center '>
        <Link href={'/product/' + product._id}>
          <div className='size-52 relative flex items-center'>
            <Image
              src={product?.images[0] ? product?.images[0] : '/No_Image_Available.jpg'}
              alt={product?.title}
              quality={70}
              width={100}
              loading='lazy'
              height={100}
              className={"cover w-full rounded-t-lg"}
            />

            <Image
              src={product?.images[0] ? product?.images[0] : '/No_Image_Available.jpg'}
              alt={product?.title}
              quality={70}
              width={100}
              loading="lazy"
              height={100}
              className={animation ? "cover w-full z-50 absolute bg-cover inset-0 rounded-t-lg animated" : "cover z-30 hidden absolute inset-0 rounded-t-lg"}
            />
          </div>
        </Link>
      </div>

      <div className="mt-4">
        <Link href={'/product/' + product._id}>
          <h3 className="text-lg text-right font-semibold line-clamp-2 text-gray-800">{product?.title}</h3>
        </Link>
        <div className='flex justify-end gap-2 items-end '>
          <p className="text-gray-950 mt-2">{formatCurrency({ number: exchangeRate != null ? product?.price * exchangeRate : product?.price, currencySymbol: currencyWanted })}</p>
          {product?.discountPrice &&
            <p
              className="text-gray-500 mb-[2.5px] line-through text-xs mt-2 relative inline-block"
              style={{ width: 'fit-content', textDecorationThickness: '1.5px', textDecorationOffset: '2px' }}
            >
              {formatCurrency({ number: exchangeRate != null ? product?.discountPrice * exchangeRate : product?.discountPrice, currencySymbol: currencyWanted })}
            </p>
          }
        </div>

        <div className='w-full flex items-center gap-3 justify-end'>
          <Etoiles number={product.rating} />
          <p className='text-lg text-slate-500'>({totalRating.numberRating ? totalRating.numberRating : 0})</p>
        </div>

        <button
          className="mt-4 w-full bg-black flex justify-around items-center text-white py-2 border-black rounded-lg border-2 hover:text-black hover:bg-white transition-colors duration-300"
          onClick={() => addToCart(product)}
        >
          Add To Cart <FaCartShopping className={animation ? 'animate-bounce' : ''} size={25} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
