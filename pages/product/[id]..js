import { useState, useEffect } from 'react';
import Footer from '@/interfaceComponents/Footer';
import NavBarInterface from '@/interfaceComponents/Nav-bar-interface';
import Image from 'next/image';
import CommentBlock from '@/components/Commentaire';
import Etoiles from '../../components/rating';
import RatingSummaryCard from '@/components/RatingSummaryCard ';
import axios from 'axios';
import { getSession } from "next-auth/react";
import Link from 'next/link';
import { Product } from '@/models/Product';
import { FaCartShopping, FaTag } from "react-icons/fa6";
import mongooseConnect from "@/lib/mongoose";
import { CartContext } from '@/components/cartContext';
import { useContext } from 'react';
import { IoAddSharp } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import formatCurrency from '@/components/formatCurrency';
import { FaFacebook, FaShoppingCart, FaWhatsappSquare } from "react-icons/fa";
import { FaXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { converterCurrency } from "@/components/currencyConverter";
import BlackBarTop from '@/components/blackBarTop';


export async function getServerSideProps(context) {
  const session = await getSession(context);
  await mongooseConnect();


  const { id } = context.params;
  const product = await Product.findById(id).lean();

  if (session?.user?.id) {
    return {
      props: {
        Session: JSON.parse(JSON.stringify(session)),
        product: JSON.parse(JSON.stringify(product)),
      }
    };
  } else {
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      }
    }
  }
}


export default function ProductPage({ Session, product }) {
  const [mainImage, setMainImage] = useState(product?.images[0] || "/No_Image_Available.jpg");
  const { setCartProducts, cartProducts } = useContext(CartContext)
  const { conversionRate, currencyWanted, } = useContext(converterCurrency)
  const [rateOfChange, setRateOfChange] = useState(null)

  const ImageChange = (src) => {
    setMainImage(src);
  };
  const [ratingList, setRatingList] = useState({})
  useEffect(() => {
    console.log('ratingList', ratingList)
  }, [ratingList])
  const [cursor, setCursor] = useState(5)
  const [message, setMessage] = useState('')
  const [commentsList, setCommentsList] = useState([])
  const [update, setUpdate] = useState(false);
  const [dejaRating, setDejaRating] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [totalRating, setTotalRating] = useState({})
  const [listOfRatingCarts, setListOfRatingCarts] = useState([])
  const [customerReview, setCustomerReview] = useState('')
  const [permissionList, setPermissionList] = useState([])
  const [timeLimit, setTimeLimit] = useState(null)
  const [currentUrl, setCurrentUrl] = useState('');


  useEffect(() => {
    setRateOfChange(conversionRate[currencyWanted])
  }, [currencyWanted])

  useEffect(() => {
    fetchData()
  }, [update])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Accéder à window seulement côté client
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    window.open(facebookShareUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=Check out this product: ${product.name}`;
    window.open(twitterShareUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=Check out this product: ${product.name} ${currentUrl}`;
    window.open(whatsappShareUrl, '_blank');
  };




  async function fetchData() {
    try {
      const [commentsResponse, ratingResponse, ratingCarts] = await Promise.all([
        axios.get('/api/comment', {
          params: { id: product?._id }, headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        }),
        axios.get('/api/rating', {
          params: { id: product?._id }, headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        }),
        axios.get('/api/rating', {
          params: { id: product?._id, limit: 20 }, headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        }),

      ]);
      setListOfRatingCarts(ratingCarts)
      setCommentsList(commentsResponse.data);
      setRatingList(ratingResponse.data);
      const totalRating = TotalRatingCalculator(ratingResponse.data);
      setTotalRating(totalRating);



    } catch (error) {
      console.error('Error fetching comments and ratings:', error);
    }

    try {
      if (Session) {
        const listRatingProduct = await axios.get('/api/UserHandler', {
          params: { _id: Session?.user?.id, productId: product?._id }, headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        })
        setPermissionList(listRatingProduct.data.timerRating.map((ele) => (ele.productId)))

        const purchaseDate = new Date(listRatingProduct.data.timerRating.filter(ele => ele.productId === product?._id)[0]?.purchaseDate)
        const timeNow = new Date()
        setTimeLimit((timeNow - purchaseDate) / (1000 * 60 * 60 * 24))
      }
    }
    catch (error) {
      console.error('Error fetching comments and ratings:', error);
    }

  }


  function TotalRatingCalculator(object) {
    const sommeRating = object.un * 1 + object.deux * 2 + object.trois * 3 + object.quatre * 4 + object.cinque * 5;
    const numberRating = object.un + object.deux + object.trois + object.quatre + object.cinque;
    if (numberRating === 0) {
      return { averageRating: 0, numberRating: 0 };
    }
    const averageRating = sommeRating / numberRating;
    return { averageRating, numberRating };
  }



  function updateFunction() {
    setUpdate(!update)
  }
  function cancel() {
    setUpdate(!update)
    setMessage('')
  }

  async function addComment(ev) {
    ev.preventDefault()
    if (Session) {
      const data = {
        name: Session?.user?.name,
        email: Session?.user?.email,
        productID: product?._id,
        comment: message
      }
      await axios.post('/api/comment', data,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }
        })
      setMessage('')
      setUpdate(!update)
    } else {
      setShowLoginMessage(true)
      setTimeout(() => {
        setShowLoginMessage(false);
      }, 3000);
    }
  }



  async function sentStars(e) {
    e.preventDefault()
    if (Session && permissionList?.includes(product?._id)) {
      const response = await axios.get('/api/products', {
        params: { id: product?._id, rating: 'rating' },

        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
        }
      })
      let list = response.data.IdOfRatingUsers || [];
      const data = {
        name: Session?.user?.name,
        email: Session?.user?.email,
        IdOfRatingUsers: [...list, Session.user?.id],
        rating: cursor,
        _id: product?._id,
        customerReview: customerReview
      }
      setDejaRating(true)
      if (list.includes(Session.user?.id)) {
        await axios.put('/api/rating', data,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
          })
        setTimeout(() => {
          setDejaRating(false);
        }, 5000);
      } else {
        await axios.post('/api/rating', data,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
          })
        setTimeout(() => {
          setDejaRating(false);
        }, 5000);
      }
      setUpdate(!update)
      setCustomerReview('')

    }
  }
  const existingProductIndex = cartProducts.find((item) => item.id === product._id)
  const addToCart = (product) => {
    const existingProductIndex = cartProducts.find((item) => item.id === product._id)

    if (existingProductIndex) {

    } else {
      // Si le produit n'existe pas dans le panier, ajoutez-le
      const newProduct = {
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        discountPercentage: product?.promotionsOrDiscounts[0]?.percentage || 0,
        discountQuantity: product?.promotionsOrDiscounts[0]?.quantity || 0,
        totalPrice: product.price,
        quantity: 1,  // Commencez avec une quantité de 1
      };
      setCartProducts(prevItems => [...prevItems, newProduct]);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  };


  const handleQuantityChange = (id, delta) => {
    setCartProducts((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          const discount = item.discountPercentage > 0 && newQuantity > item.discountQuantity ? item.discountPercentage / 100 : 0;
          const discountedPrice = item.price - item.price * discount;
          const totalPrice = newQuantity * discountedPrice;

          return {
            ...item,
            quantity: newQuantity,
            totalPrice: totalPrice // Mise à jour du prix total
          };
        }
        return item;
      })
    );
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  };


  return (
    <div>
      <div className=''>
        <BlackBarTop />
        <NavBarInterface classNameGlobal={' mt-12'} classNameMenuUserIcon={' !top-16'} />
        <div className="min-h-screen bg-gray-100 px-2">
          <div className="mx-auto mt-5 bg-white p-6 shadow-md rounded-lg">
            <div className="flex flex-col-reverse md:grid md:grid-cols-2 text-right gap-6">

              <div>
                <h1 className="text-3xl text-right font-semibold text-gray-800">
                  {product?.title}
                </h1>
                {/*total rating section */}
                <div className="mt- flex justify-end items-center">
                  <p className="text-gray-500 mr-2">
                    ({totalRating.numberRating ? totalRating.numberRating : 0})
                  </p>
                  <div className="flex items-center">
                    <Etoiles number={totalRating.averageRating} />
                  </div>
                </div>

                {/* price section */}
                <hr className='mt-5' />
                <p className="text-4xl font-bold text-red-800 my-2">
                  {formatCurrency({ number: rateOfChange != null ? product?.price * rateOfChange : product?.price, currencySymbol: currencyWanted })}
                </p>
                <hr />


                {/* description section */}
                {product?.description &&
                  <div className="">
                    <p className="text-gray-600 my-2">
                      {product?.description}
                    </p>
                    <hr />
                  </div>}

                {product?.properties?.length > 0 &&
                  <div className="mt-2 rounded-lg">
                    {/* <h3 className="text-xl mb-2 font-semibold text-gray-700">
                        properties
                      </h3> */}
                    <div className='mb-0'>
                      {product?.properties?.length > 0 && product?.properties.map((ele) => (
                        <div key={ele.property}>
                          <div>
                            {ele.property}
                          </div>
                          <div className='flex justify-end  gap-2 py-1 pb-2 pr-5'>
                            {ele.valuesWanted.length > 0 && ele.valuesWanted.map((value, index) => (
                              <div onClick={() => choiceProperties(ele.property, value.value)} className='border hover:border-yellow-500 rounded-md px-3 py-1 hover:bg-slate-100 border-slate-600' key={index}>
                                {value.value}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>}
                <hr />

                <div className='mt-2'>

                  {/* <div className={`flex items-center ${product?.stockQuantity < 25 ? "animate-pulse text-red-500":''} space-x-1 text-sm text-gray-700 bg-yellow-100 p-2 rounded-md`}>
                                  <span>Just</span>
                                  <span className="font-bold text-yellow-600 underline">{product?.stockQuantity}</span>
                                  <span>left in stock</span>
                                  </div> */}


                  {/* add to cart section */}

                  {!existingProductIndex ?
                    <div className='w-full flex justify-end'>
                      <button
                        className="mt-0 w-1/2 bg-black flex justify-center gap-3 items-center text-white py-2 rounded-lg hover:bg-white hover:text-black border-black border-2 transition-colors duration-300"
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart <FaCartShopping size={25} />
                      </button>
                    </div>
                    :
                    <div className='w-full flex justify-end '>
                      <div className="flex border-2 w-1/2  justify-between p-2 rounded-md items-center">
                        <button
                          onClick={() => handleQuantityChange(product._id, -1)}
                          className="px-2 py-1 font-bold border-2 rounded-md hover:bg-gray-500"
                        >
                          <IoRemove size={20} />
                        </button>
                        <span className="px-4  rounded-md font-semibold text-xl">
                          {cartProducts?.filter((item) => item.id == product._id)[0]?.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product._id, 1)}
                          className="px-2 py-1 font-bold border-2 rounded-md hover:bg-gray-500"
                        >
                          <IoAddSharp size={20} />
                        </button>
                      </div>
                    </div>
                  }
                  {/* Social media icons */}
                  <div className=' flex justify-end rounded-lg'>
                    <div className="flex">
                      <button
                        onClick={shareOnFacebook}
                        className="py-2 pr-3 text-blue-700 rounded-lg hover:scale-110"
                      >
                        <FaFacebook size={25} />
                      </button>
                      <button
                        onClick={shareOnTwitter}
                        className="py-2 pr-3 rounded-lg hover:scale-110"
                      >
                        <FaXTwitter size={25} />
                      </button>
                      <button
                        onClick={shareOnWhatsApp}
                        className="py-2 text-green-500 rounded-lg hover:scale-110"
                      >
                        <FaWhatsappSquare size={25} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2">



                  {product?.promotionsOrDiscounts?.length > 0 &&
                    <div className="mt-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-700">
                        Discounts
                      </h3>
                      <hr className='border-black mb-3 mt-1' />
                      <div className='mb-6 flex flex-col gap-3'>
                        {product.promotionsOrDiscounts.length > 0 && product.promotionsOrDiscounts.map((ele) => (
                          <div key={ele.titre} className='w-full text-white py-1 overflow-hidden text-sm flex justify-center  bg-red-500'>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
                              <div key={el} className='flex flex-col justify-center items-center'>
                                <div className='flex items-center text-xs gap-1'>
                                  <span>
                                    with
                                  </span>
                                  <span className='text-sm font-semibold'>
                                    {ele.titre} discount
                                  </span>
                                </div>

                                <div className='flex items-center'>
                                  <span className='inline-block -rotate-90 font-extrabold text-2xl'>
                                    Save
                                  </span>
                                  <span className='text-white text-6xl font-extrabold'>
                                    {ele.percentage}%
                                  </span>
                                </div>

                                <div className='text-xs'>
                                  <span>
                                    min order :
                                  </span>
                                  <span>
                                    {ele.quantity}
                                  </span>
                                </div>
                              </div>
                            ))}

                          </div>

                        ))}
                      </div>
                    </div>}

                  <div className="mt-4 bg-gray-50   rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700">
                      Menu & Content
                    </h3>
                    <p className="text-gray-600">
                      Manage the menu and content sections of the application. This includes updating menu items and configuring content displayed on the pages.
                    </p>
                    <ul className="mt-2 list-disc list-inside">
                      <li>Update Menu Items</li>
                      <li>Edit Page Content</li>
                      <li>Configure Navigation</li>
                      <li>Update Menu Items</li>
                      <li>Edit Page Content</li>
                      <li>Configure Navigation</li>
                      <li>Update Menu Items</li>
                      <li>Edit Page Content</li>
                      <li>Edit Page Content</li>
                      <li>Configure Navigation</li>
                      <li>Update Menu Items</li>
                      <li>Edit Page Content</li>
                      <li>Edit Page Content</li>
                      <li>Configure Navigation</li>
                      <li>Update Menu Items</li>
                      <li>Edit Page Content</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row place-content-center gap-2 ">
                <div className='md:relative w-full block '>
                  <div className='md:sticky flex md:top-16  justify-center border-2 rounded-lg'>
                    <Image
                      src={mainImage}
                      alt={product?.title}
                      loading='lazy'
                      layout="responsive"
                      width={500}
                      height={500}
                      className=" rounded-lg"
                    />
                  </div>
                </div>
                <div className='md:relative place-content-start block'>
                  <div className='flex md:sticky md:top-16 items-center justify-around md:justify-normal md:max-h-80 p-0 overflow-x-auto md:overflow-y-auto md:border-2 rounded-lg w-full md:max-w-20 flex-row md:flex-col'>
                    {product?.images.map((src, index) => (
                      <div key={index} className="border-2  relative">
                        <Image
                          onClick={() => ImageChange(src)}
                          src={src}
                          alt={`Product image ${index + 1}`}
                          width={100}
                          height={100}
                          quality={10}
                          className="rounded-lg p-1 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            <div className='flex my-12 justify-center items-center '>
              <hr className=' w-1/2 ' />
              <h2 className='text-nowrap text-2xl px-2'> تقييمات عملائنا</h2>
              <hr className=' w-1/2' />
            </div>

            <div className={!permissionList?.includes(product?._id) ? 'grid gap-1 mt-6 px-5' : 'grid md:grid-cols-2 gap-1 mt-6'}>
              {permissionList?.includes(product?._id) && timeLimit < 30 &&
                <div className='border-2 w-full border-gray-300 rounded-lg bg-white mx-auto px-6 pt-6 pb-1 shadow-lg max-w-md'>


                  {!dejaRating ?
                    <form className='text-right' onSubmit={(e) => sentStars(e)}>
                      <h1 className='text-xl font-semibold text-gray-800'>هل سبق لك استخدام منتجنا؟</h1>
                      <p className='text-gray-600 text-sm'>شاركنا رأيك وتجربتك.</p>
                      <div className='pt-3 flex justify-center px-8'>
                        <textarea
                          rows="3"
                          value={customerReview}
                          required
                          onChange={(e) => setCustomerReview(e.target.value)}
                          placeholder='...  اكتب ملاحظاتك هنا'
                          className='bg-slate-100 resize-none text-right rounded-md text-xs p-1 w-full'
                        />
                      </div>
                      <div className='mt-3 flex justify-center gap-6 relative'>
                        <div className='relative flex items-center'>
                          <Etoiles number={cursor} />
                          <input
                            type="range"
                            min="1"
                            max="5"
                            className='absolute inset-0 bg-slate-200 opacity-0 rotate-180 cursor-pointer'
                            value={cursor}
                            onChange={(e) => {
                              setCursor(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <button type='submit' className='mt-1 rounded-lg px-2 float-end bg-black border-2 border-black text-white hover:bg-white   hover:text-black duration-300'>
                        إرسال
                      </button>
                    </form>

                    :
                    <div className='text-right'>
                      <h2 className='text-2xl font-semibold text-black'>جزيل الشكر لك!</h2>
                      <p className='text-gray-800 text-lg mt-2'>نحن ممتنون لوقتك وملاحظاتك القيمة.</p>
                      <p className='text-gray-600 text-sm mt-2'>
                        تعليقاتك الثمينة هي أساس تحسين خدماتنا وتطوير منتجاتنا باستمرار لتلبية تطلعاتك بأفضل صورة.
                      </p>
                    </div>

                  }

                </div>
              }

              <div className=''>
                <RatingSummaryCard ratingList={ratingList} />
              </div>
            </div>


            {listOfRatingCarts?.data?.length > 0 &&
              <div>
                <div className='flex my-12 justify-center items-center '>
                  <hr className=' w-1/2 ' />
                  <h2 className='text-nowrap text-2xl px-2'>آراء عملائنا</h2>
                  <hr className=' w-1/2' />
                </div>
                <div className=' overflow-auto flex gap-5 p-3'>
                  {listOfRatingCarts.data.length > 0 && listOfRatingCarts.data.map((ele) => (

                    <div key={ele.email} className='border-2 h-full border-gray-300 rounded-lg bg-white mx-auto p-6 shadow-md w-80'>
                      <div className='flex flex-col'>
                        <h1 className='text-xl flex justify-center font-semibold text-gray-800 mb-2'>{ele.name}</h1>
                        <div className='flex flex-col justify-center gap-2 items-center'>
                          <p className='text-right'>{ele.customerReview}</p>
                          <Etoiles number={ele.rating} />
                        </div>
                      </div>
                    </div>
                  ))

                  }
                </div>
              </div>
            }

            <div className='flex my-12 justify-center items-center '>
              <hr className=' w-1/2 ' />
              <h2 className='text-nowrap text-2xl px-2'>التعليقات</h2>
              <hr className=' w-1/2' />
            </div>

            {product.comments ?
              <div>
                <div className='bg-white p-4 rounded-lg shadow-sm mt-6'>
                  <form onSubmit={(ev) => addComment(ev)} className='flex items-start space-x-4'>
                    <div className='flex-grow'>
                      <textarea
                        className='w-full bg-gray-100 text-right rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black'
                        rows='2'
                        placeholder='...  أضف تعليقًا '
                        value={message}
                        required
                        onChange={e => setMessage(e.target.value)}
                      ></textarea>

                      {showLoginMessage &&
                        <div className='text-sm justify-center items-center flex gap-2 border-2 px-1 rounded-md border-red-500 text-red-500'>
                          <div>يجب عليك تسجيل الدخول أولاً</div>
                          <Link className='text-blue-950 hover:underline' href={'/Login'}>تسجيل الدخول</Link>
                        </div>
                      }

                      <div className='flex items-center justify-end space-x-2 mt-2'>
                        <button type='button' onClick={cancel} className='bg-white border-2 border-black text-black hover:bg-black hover:text-white px-4 py-1.5 rounded-lg font-medium duration-300'>
                          إلغاء
                        </button>
                        <button type='submit' className=' bg-black border-2 border-black text-white hover:bg-white   hover:text-black duration-300 px-4 py-1.5 rounded-lg font-medium'>
                          إضافة تعليق
                        </button>
                      </div>
                    </div>
                  </form>
                </div>



                <div className='w-full'>
                  {commentsList.length > 0 && commentsList.map((comment) => (
                    ((comment.isReply === false) &&
                      <CommentBlock key={comment._id} review={comment} session={Session} id={product?._id} fetchData={updateFunction} />
                    )
                  ))}

                </div>

              </div>
              :
              <div className="border-2 h-full border-gray-300 rounded-lg bg-white mx-auto p-6 mt-6 w-full">
                <div className="flex justify-center items-center">
                  <div>
                    <p className="text-gray-600 text-sm mt-2">
                      التعليقات على هذا المنتج معطلة حاليا. يرجى التحقق مرة أخرى في وقت لاحق.
                    </p>
                  </div>
                </div>
              </div>
            }

          </div>

        </div>
        <div>
        </div>
        <Footer />
      </div>

    </div>
  );
}
