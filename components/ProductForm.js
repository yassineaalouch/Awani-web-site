"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import CommentBlock from "./Commentaire";
import RatingSummaryCard from "./RatingSummaryCard ";
import Etoiles from "./rating";
import { useSession } from "next-auth/react";
import Hr from "@/interfaceComponents/Hr";
import Select from "react-select";
import makeAnimated from 'react-select/animated';


export default function ProductForm({ _id, rating, properties: existProperties, comments: existingComments, ratingDistribution, title: existingTitle, discountPrice: existingDiscountPrice, description: existingDescription, price: existingPrice, images: existingImages, category: existingCategory, purchasePrice: existingPurchasePrice, supplier: existingSupplier, stockQuantity: existingStockQuantity, dimensions: existingDimensions, countryOfProduction: existingCountryOfProduction, deliveryTime: existingDeliveryTime, SKU: existingSKU, barcode: existingBarcode, customerReviews: existingCustomerReviews, materials: existingMaterials, careInstructions: existingCareInstructions, allergens: existingAllergens, expirationDate: existingExpirationDate, certificatesAndLabels: existingCertificatesAndLabels, recyclingInformation: existingRecyclingInformation, returnAndWarrantyConditions: existingReturnAndWarrantyConditions, promotionsOrDiscounts: existingPromotionsOrDiscounts, complementaryProducts: existingComplementaryProducts, productFAQ: existingProductFAQ }) {
    const { data: session } = useSession()
    const [existPropList,setExistPropList]= useState(existProperties || [])
    console.log("existPropList",existPropList)
    const [title, setTitle] = useState(existingTitle || '');
    const [category, setCategory] = useState(existingCategory || '')
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [discountPrice, setDiscountPrice] = useState(existingDiscountPrice || '');
    const [stockQuantity, setStockQuantity] = useState(existingStockQuantity || '');
    const [purchasePrice, setPurchasePrice] = useState(existingPurchasePrice || '');
    const [dimensions, setDimensions] = useState(existingDimensions || { length: '', width: '', height: '' });
    const [deliveryTime, setDeliveryTime] = useState(existingDeliveryTime || '');
  
  
    const [supplier, setSupplier] = useState(existingSupplier || '');
    const [countryOfProduction, setCountryOfProduction] = useState(existingCountryOfProduction || '');
    const [SKU, setSKU] = useState(existingSKU || '');
    const [barcode, setBarcode] = useState(existingBarcode || '');
    const [careInstructions, setCareInstructions] = useState(existingCareInstructions || '');
    const [expirationDate, setExpirationDate] = useState(existingExpirationDate?.split('T')[0] || '');
    const [recyclingInformation, setRecyclingInformation] = useState(existingRecyclingInformation || '');
    const [returnAndWarrantyConditions, setReturnAndWarrantyConditions] = useState(existingReturnAndWarrantyConditions || '');

    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    
    const [properties, setProperties] = useState(existProperties || []);
    const [products, setProducts] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [discountsList, setDiscountsList] = useState([])
    const [discountListToSend, setDiscountsListToSend] = useState([])
    const [comments, setComments] = useState(existingComments || false)
    const [propertiesList, setPropertiesList] = useState([])
    const [propertiesValuesList, setPropertiesValuesList] = useState([])
    const [errorTitle, setErrorTitle] = useState(false);
    const [addSuccessfully, setAddSuccessfully] = useState(true);
    const [listOfNewImage, setListOfNewImage] = useState('');
    const router = useRouter();
    const [commentsList, setCommentsList] = useState([])
    const [update, setUpdate] = useState(false);
    const animatedComponents = makeAnimated();
    const [litOfPropertiesToValidate, setLitOfPropertiesToValidate] = useState(properties || [])



    const [PropertiesNew,setPropertiesNew]=useState(existProperties||[])


    useEffect(() => {
        initializeProperties()
    }, [])
    useEffect(() => {
        const request1 = axios.get('/api/categories', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        });
        const request2 = axios.get('/api/properties', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        });
        const request3 = axios.get('/api/products', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        });
        const request4 = axios.get('/api/discount', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        });
        const request5 = axios.get('/api/comment', {
            params: { id: _id }, headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        })


        axios.all([request1, request2, request3, request4, request5])
            .then(axios.spread((response1, response2, response3, response4, response5) => {
                setCategories(response1.data)
                setProperties(response2.data.map((ele) => ({ ...ele, values: ele.values.map((value) => ({ value: value, label: value })), value: ele.name, label: ele.name })));
                setProducts(response3.data);
                setDiscounts(response4.data.map((ele) => ({ ...ele, label: ele.titre, value: ele.titre })));
                console.log('discount', response4.data.map((ele) => ({ ...ele, label: ele.titre, value: ele.titre })))
                setCommentsList(response5.data);

            }))
            .catch(errors => {
                alert(errors);
            });
    }, [update])

    useEffect(() => {
        const request5 = axios.get('/api/comment', {
            params: { id: _id }, headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
            }
        })
        axios.all([request5])
            .then(axios.spread((response5) => {
                setCommentsList(response5.data);
            }))
            .catch(errors => {
                alert(errors);
            });
    }, [update])

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price, promotionsOrDiscounts: discountListToSend, discountPrice, comments, images, category, properties: PropertiesNew, purchasePrice, supplier, stockQuantity, dimensions, countryOfProduction, deliveryTime, SKU, barcode, careInstructions, expirationDate, recyclingInformation, returnAndWarrantyConditions };
        if (title.trim() != "") {
            if (_id) {
                await axios.put('/api/products', { ...data, _id }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
                    }
                });
            } else {
                await axios.post('/api/products', data, {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
                    }
                });
            }
            setGoToProducts(true);
            setErrorTitle(false);
            setAddSuccessfully(true);
        } else {
            setErrorTitle(true);
            setAddSuccessfully(false);
        }
    }

    if (goToProducts) {
        router.push('/Products')
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data, {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
                }
            })
            setImages(oldImages => {
                setListOfNewImage(listOfNewImage => [...listOfNewImage, ...res.data.links])
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false)
        }
    }

    function updatedImagesOrder(images) {
        setImages(images)
    }

    async function deleteImage(linkToDelete) {
        const baseUrl = "https://revofeed.s3.amazonaws.com/";
        const fileKey = linkToDelete.replace(baseUrl, "");
        axios.delete('/api/upload', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: { key: fileKey }
        })
            .then(() => {
                setImages(oldImages => oldImages.filter(link => link !== linkToDelete));
            })
            .catch(err => {
                console.error('Error deleting image:', err);
            });
    }

    function Cancel() {
        if (listOfNewImage.length > 0) {
            listOfNewImage.forEach(ele => deleteImage(ele));
        }
        router.push('/Products')
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
        if (session) {
            const data = {
                name: session?.user?.name,
                email: session?.user?.email,
                productID: _id,
                comment: message
            }
            await axios.post('/api/comment', data, {
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
    const [message, setMessage] = useState('')


    const handleSelectChange = (propertyId, selectedValues) => {
        setPropertiesValuesList(prevState => ({
            ...prevState,
            [propertyId]: selectedValues
        }));
        let list = []
        list = propertiesList.map((ele) => (ele.name))
        setLitOfPropertiesToValidate(list.map((ele) => (
            {
                property: ele,
                valuesExist: propertiesValuesList[ele]
            }
        )).filter(ele => ele?.valuesExist?.length > 0))
        console.log('lit', list)
        console.log('litOfPropertiesToValidate', litOfPropertiesToValidate)
        console.log('propertiesListglobaaaaal', propertiesList)
        console.log('PropertiesValuesList', propertiesValuesList)


    };

    function initializeProperties() {
        let list = []
        if (existProperties && existProperties.length > 0) {

            for (let ele of existProperties) {
                list.push({ label: ele.property, value: ele.property })
                setPropertiesValuesList(prevState => ({
                    ...prevState,
                    [ele.property]: ele.valuesExist
                }));


            }
            setPropertiesList(list)

            console.log('propertiesListglobaaaaal', propertiesList)

            console.log('PropertiesValuesList', propertiesValuesList)
        }

    }









    return (
        <>
            {!addSuccessfully && <div className="bg-red-200 w-full h-12 fixed  inset-0 flex justify-center  items-center text-3xl font-bold text-red-600">
                Error
            </div>}

            <form onSubmit={saveProduct}>
                <label className="this">Product name</label>
                <input
                    className="this"
                    type="text"
                    placeholder="Product name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                {errorTitle && <p className="text-red-600 text-xs pl-1">The title isn`t valid</p>}

                <label className="this">Photos</label>
                <div className="mb-2 flex flex-wrap gap-2 scrollBarNon overflow-x-scroll">

                    <label className="w-24 h-24 border flex justify-center rounded-lg flex-col items-center text-sm text-gray-500 hover:text-gray-900 bg-slate-200 hover:bg-slate-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        Upload
                        {!images?.length && (
                            <div className="pt-2 text-xs text-center">No images for this Product</div>
                        )}
                        <input type="file" onChange={uploadImages} className="hidden"></input>
                    </label>

                    <ReactSortable
                        list={images}
                        className="flex flex-wrap gap-1"
                        setList={updatedImagesOrder}>
                        {!!images?.length && images.map((link, index) => (

                            <div key={index} className="relative h-24 w-24 bg-slate-400/10 flex justify-center items-center rounded-lg overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => deleteImage(link)}
                                    className="absolute top-1 right-1 text-red-600 font-bold z-10 bg-white rounded-full w-5 h-5 flex items-center justify-center">X
                                </button>
                                <img
                                    src={link}
                                    alt={title || "product"}
                                    quality={40}
                                    className="object-cover rounded-lg"
                                />

                            </div>
                        ))}
                    </ReactSortable>

                    {isUploading && (
                        <div className="flex justify-center items-center rounded-lg w-24 h-24">
                            <Spinner color="#00FF00" speed={2} size="60px" /> {/*color must be hexa code exp: "#00FF00" */}
                        </div>
                    )}

                </div>

                <label className="this">Price</label>
                <input
                    className="this"
                    type="number"
                    placeholder=" Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />

                <label className="this">Price before discount</label>
                <input
                    className="this"
                    type="number"
                    placeholder=" Price before discount"
                    value={discountPrice}
                    onChange={e => setDiscountPrice(e.target.value)}
                />

                <label className="this">Purchase Price (USD)</label>
                <input
                    className="this"
                    type="number"
                    placeholder="Purchase Price"
                    value={purchasePrice}
                    onChange={e => setPurchasePrice(e.target.value)}
                />
                
                <label className="this">Description</label>
                <textarea
                    className="this"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <label className="this">Category</label>
                <select className="this mt-1" value={category} onChange={ev => { setCategory(ev.target.value) }}>
                    <option value="">not categorized </option>
                    {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name} </option>
                    ))}
                </select>



                <label className="this">Properties</label>
                



                <Select
                    options={properties}
                    value={propertiesList}
                    isMulti={true}
                    components={animatedComponents}
                    onChange={ev => { setPropertiesList(ev); console.log('properties', properties);console.log('propertiesListpropertiesList', ev) }}
                />
                
                {propertiesList.length > 0 &&
                    <div className="pt-4 ml-1 rounded-bl-lg mb-10 border-l-2">
                        {propertiesList.length > 0 && propertiesList.map(ele => (
                            <div className="ml-10" key={ele._id}>
                                <div>{ele.label}</div>
                                <div>
                                    <Select
                                        options={ele.values}
                                        value={PropertiesNew.filter(p => p.property === ele.name).valuesWanted}
                                        isMulti={true}
                                        components={animatedComponents}
                                        onChange={ev => 
                                            {   console.log('PropertiesNew.filter(p => p.property === ele.name).valuesWanted',PropertiesNew.filter(p => p.property === ele.name).valuesWanted)
                                                console.log('existProperties.filter(prop=>prop.property === ele.name).valuesWanted',existProperties.filter(prop=>prop.property === ele.name).valuesWanted)
                                                setPropertiesNew(prev => {
                                                    // Check if the property already exists
                                                    const existingProperty = prev.find(p => p.property === ele.name);
                                                    if (existingProperty) {
                                                        // Update the existing property
                                                        return prev.map(p =>
                                                            p.property === ele.name ? { ...p, valuesWanted: ev } : p
                                                        );
                                                    } else {
                                                        // Add a new property entry
                                                        return [...prev, { property: ele.name, valuesWanted: ev, valuesInterval: ele.values }];
                                                    }
                                                });
                                                console.log('PropertiesNew', PropertiesNew);
                                                // console.log('ev', ev);
                                                // console.log('ele.name', ele.name);
                                                // console.log('ele.values', ele.values);
                                            }
                                            
                                            // {setPropertiesNew((prev) => [...prev,{property:ele.name,valueWanted:ev,valuesInterval:ele.values }]);console.log('PropertiesNew',PropertiesNew) ;console.log('ev',ev);console.log('ele.name',ele.name);console.log('ele.values',ele.values)  }
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                }


                <label className="this">Dimensions (cm)</label>
                <div className="flex gap-2">
                    <input
                        className="this w-1/3"
                        type="number"
                        placeholder="Length"
                        value={dimensions.length}
                        onChange={e => setDimensions({ ...dimensions, length: e.target.value })}
                    />
                    <input
                        className="this w-1/3"
                        type="number"
                        placeholder="Width"
                        value={dimensions.width}
                        onChange={e => setDimensions({ ...dimensions, width: e.target.value })}
                    />
                    <input
                        className="this w-1/3"
                        type="number"
                        placeholder="Height"
                        value={dimensions.height}
                        onChange={e => setDimensions({ ...dimensions, height: e.target.value })}
                    />
                </div>

                <label className="this">Stock Quantity</label>
                <input
                    className="this"
                    type="number"
                    placeholder="Stock Quantity"
                    value={stockQuantity}
                    onChange={e => setStockQuantity(e.target.value)}
                />

                <label className="this">Delivery Time (days)</label>
                <input
                    className="this"
                    type="number"
                    placeholder="Delivery Time"
                    value={deliveryTime}
                    onChange={e => setDeliveryTime(e.target.value)}
                />
                
                <label className="this">Comments</label>
                <select
                    className="this"
                    type=""
                    placeholder="Purchase Price"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                >
                    <option value={true}>Authorize</option>
                    <option value={false}>Block</option>
                </select>





{/* 
                <hr className="my-4"/>
                <label className="this">Discounts</label>
                <Select
                    options={discounts}
                    value={discountsList}
                    components={animatedComponents}
                    onChange={ev => { setDiscountsList(ev); setDiscountsListToSend([{ titre: ev.titre, percentage: ev.price, quantity: ev.quantity }]) }}
                />


                <label className="this">Supplier</label>
                <input
                    className="this"
                    type="text"
                    placeholder="Supplier"
                    value={supplier}
                    onChange={e => setSupplier(e.target.value)}
                />



                <label className="this">Country of Production</label>
                <input
                    className="this"
                    type="text"
                    placeholder="Country of Production"
                    value={countryOfProduction}
                    onChange={e => setCountryOfProduction(e.target.value)}
                />


                <label className="this">SKU</label>
                <input
                    className="this"
                    type="text"
                    placeholder="SKU"
                    value={SKU}
                    onChange={e => setSKU(e.target.value)}
                />

                <label className="this">Barcode</label>
                <input
                    className="this"
                    type="text"
                    placeholder="Barcode"
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                />


                <label className="this">Care Instructions</label>
                <textarea
                    className="this resize-none"
                    placeholder="Care Instructions"
                    value={careInstructions}
                    onChange={e => setCareInstructions(e.target.value)}
                />

                <label className="this">Expiration Date</label>
                <input
                    className="this"
                    type="date"
                    placeholder="Expiration Date"
                    value={expirationDate}
                    onChange={e => setExpirationDate(e.target.value)}
                />

                <label className="this">Recycling Information</label>
                <textarea
                    className="this resize-none"
                    placeholder="Recycling Information"
                    value={recyclingInformation}
                    onChange={e => setRecyclingInformation(e.target.value)}
                />

                <label className="this">Return and Warranty Conditions</label>
                <textarea
                    className="this resize-none"
                    placeholder="Return and Warranty Conditions"
                    value={returnAndWarrantyConditions}
                    onChange={e => setReturnAndWarrantyConditions(e.target.value)}
                /> */}












                <div className="flex gap-2 justify-center py-2">
                    <button type="button" onClick={Cancel} className="bg-gray-200 px-2 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="btn-primary">Save</button>
                </div>
            </form>


            {/* <Hr classNameHr=" w-1/3 border-gray-300" classNameTitre=" font-bold text-black text-lg text-nowrap lg:text-xl p-4" titre="Customer reviews" />
            <label className="this ">Average Customer Rating</label>
            <div className="flex border-2 rounded-md px-1 justify-center items-center">
                <Etoiles number={rating} />
                <div className=" text-xl font-bold">
                    {rating || 0}/5
                </div>
            </div>

            <label className="this">User Ratings</label>
            <div>
                <RatingSummaryCard admin='admin' ratingList={ratingDistribution} />
            </div>
            <hr />
            <div>
                <Hr classNameHr=" w-1/3 border-gray-300" classNameTitre=" font-bold text-black text-lg text-nowrap lg:text-xl p-4" titre="Customer feedback" />

                <Hr classNameHr=" w-1/3 border-gray-300" classNameTitre=" font-bold text-black text-lg text-nowrap lg:text-xl p-4" titre="Customer comments" />

                <div>
                    <div className='bg-white p-4 rounded-lg shadow-sm mt-6'>
                        <form onSubmit={(ev) => addComment(ev)} className='flex items-start space-x-4'>

                            <div className='flex-grow'>
                                <textarea
                                    className='w-full bg-gray-100 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                    rows='2'
                                    placeholder='Add a public comment...'
                                    value={message}
                                    required
                                    onChange={e => setMessage(e.target.value)}
                                ></textarea>

                                <div className='flex items-center space-x-2 mt-2'>
                                    <button type='submit' className='bg-yellow-500 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-yellow-600'>
                                        Add Comment
                                    </button>
                                    <button type='button' onClick={cancel} className='text-gray-600 hover:text-gray-800'>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>



                    <div className='w-full'>
                        {commentsList.length > 0 && commentsList.map((comment) => (
                            ((comment.isReply === false) &&
                                <CommentBlock key={comment._id} review={comment} session={session} id={_id} fetchData={updateFunction} />
                            )
                        ))}

                    </div>

                </div>


            </div> */}
        </>
    )
}