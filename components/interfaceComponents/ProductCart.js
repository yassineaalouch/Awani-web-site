"use client"
import { CartContext } from '@/context/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6"; 
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
  const existingProduct = cartProducts.find((item) => item.id === product._id);
  const ProductExiste = existingProduct !== undefined;
  
  // State to handle animation for adding to the cart
  const [animation, setAnimation] = useState(false);

  // Timer to reset the animation after 1 second
  const timer = setTimeout(() => {
    setAnimation(false);
  }, 1000);

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    const existingProductIndex = cartProducts.findIndex((item) => item.id === product._id);
    if (existingProductIndex !== -1) {
      // If product exists, update its quantity
      const updatedCart = [...cartProducts];
      updatedCart[existingProductIndex].quantity += 1;
      updatedCart[existingProductIndex].totalPrice = updatedCart[existingProductIndex].price * updatedCart[existingProductIndex].quantity;
      setAnimation(true);
      clearTimeout(timer);
      setCartProducts(updatedCart);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
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
        localStorage.setItem('cart', JSON.stringify([...cartProducts, newProduct]));
      }
    }
  };

  // Function to decrease quantity or remove product from cart
  const decreaseQuantity = (product) => {
    const existingProductIndex = cartProducts.findIndex((item) => item.id === product._id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartProducts];
      if (updatedCart[existingProductIndex].quantity > 1) {
        // Decrease quantity if more than 1
        updatedCart[existingProductIndex].quantity -= 1;
        updatedCart[existingProductIndex].totalPrice = updatedCart[existingProductIndex].price * updatedCart[existingProductIndex].quantity;
      } else {
        // Remove product if quantity would become 0
        updatedCart.splice(existingProductIndex, 1);
      }
      setCartProducts(updatedCart);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col md:max-w-64">
      {/* Product container - horizontal on mobile, vertical on md+ */}
      <div className="flex flex-row md:flex-col w-full gap-4 md:gap-0">
        
        {/* Image container */}
        <div className='rounded-t-lg flex justify-center items-center md:w-full w-1/3'>
          <div className='relative w-24 h-24 md:w-52 md:h-52'>
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
        </div>

        {/* Content container */}
        <div className="flex flex-col md:mt-4 justify-between w-2/3 md:w-full">
          {/* Title and price container */}
          <div className="flex flex-col">
            <h3 className="text-sm md:text-lg text-right font-semibold line-clamp-2 text-gray-800">{product?.title}</h3>

            <div className='flex justify-end gap-2 items-end'>
              <p className="text-gray-950 mt-2 text-sm md:text-base">
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
          </div>

          {/* Add to cart button */}
          <button
            className={`mt-2 md:mt-4 w-full flex justify-around items-center py-1 md:py-2 rounded-lg border-2 border-[#6bb41e] transition-colors duration-300 ${
              ProductExiste && existingProduct.quantity >= 1 
                ? "bg-white text-[#6bb41e] text-center"  
                : "bg-[#6bb41e] text-white hover:text-[#6bb41e] hover:bg-white"
            }`}
            onClick={() => addToCart(product)}
          >
            {ProductExiste && existingProduct.quantity >= 1 ? (
              <div className="flex items-center justify-around w-full">
                <FaMinus 
                  className="cursor-pointer hover:text-red-500" 
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQuantity(product);
                  }}
                />
                <span className="text-[#6bb41e] font-extrabold text-base md:text-lg">{existingProduct.quantity}</span>
              </div>
            ) : (
              <div className="flex items-center justify-around w-full">
                <FaCartShopping className={animation ? 'animate-bounce' : ''} size={20} />
                <span className="text-sm md:text-base">اشتري الآن</span>
              </div>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
