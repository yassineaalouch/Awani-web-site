// // import { useEffect, useState } from "react";
// // import Layout from "../components/Layout";
// // import Link from "next/link";
// // import axios from "axios";
// // import { getSession } from "next-auth/react";
// // export async function getServerSideProps(context) {
// //     const session = await getSession(context);

// //     if (!session || session.user.role !== 'admin') {
// //         return {
// //             redirect: {
// //                 destination: '/Login',
// //                 permanent: false,
// //             },
// //         };
// //     }

// //     return {
// //         props: { session },
// //     };
// // }

// // export default function Products() {
// //     const [products, setProducts] = useState([]);
// //     useEffect(() => {
// //         axios.get('/api/products', {
// //             params: { page: 'dashbord' },
// //             headers: {
// //                 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
// //             }
// //         }).then(response => {
// //             setProducts(response.data);
// //         });
// //     }, []);
// //     return (
// //         <Layout>
// //             <div className="">

// //                 <Link className="btn-primary" href={'/products/new'}>Add new product</Link>


// //                 <table className="basic">
// //                     <thead>
// //                         <tr>
// //                             <td>Product name</td>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {products.map(product => (
// //                             <tr key={product._id}>
// //                                 <td className="flex justify-between">
// //                                     <span className="line-clamp-2 " title={product.title}>
// //                                         {product.title}
// //                                     </span>
// //                                     <span className="px-1 ml-2">
// //                                         <Link className="text-gray-400 hover:text-gray-600" href={'/products/edit/' + product._id}>
// //                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-5">
// //                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
// //                                             </svg>
// //                                         </Link>
// //                                         <Link className="text-red-400 hover:text-red-600" href={'/products/delete/' + product._id}>
// //                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
// //                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
// //                                             </svg>
// //                                         </Link>
// //                                     </span>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </Layout>
// //     );

// // }


// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import Link from "next/link";
// import axios from "axios";
// import { getSession } from "next-auth/react";

// export async function getServerSideProps(context) {
//     const session = await getSession(context);

//     if (!session || session.user.role !== 'admin') {
//         return {
//             redirect: {
//                 destination: '/Login',
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { session },
//     };
// }

// export default function Products() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         axios.get('/api/products', {
//             params: { page: 'dashbord' },
//             headers: {
//                 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
//             }
//         }).then(response => {
//             setProducts(response.data);
//         });
//     }, []);

//     return (
//         <Layout>
//             <div className="container mx-auto px-4 py-8">
//                 <div className="mb-6">
//                     <Link href={'/products/new'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
//                         Add new product
//                     </Link>
//                 </div>

//                 <div className=" bg-white shadow-md rounded-lg">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Product name
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {products.map(product => (
//                                 <tr key={product._id} className="hover:bg-gray-50">
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm font-medium text-gray-900 line-clamp-2" title={product.title}>
//                                             {product.title}
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                         <Link href={'/products/edit/' + product._id} className="text-indigo-600 hover:text-indigo-900 mr-4">
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//                                             </svg>
//                                         </Link>
//                                         <Link href={'/products/delete/' + product._id} className="text-red-600 hover:text-red-900">
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                                             </svg>
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/Login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products', {
            params: { page: 'dashbord' },
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
            }
        }).then(response => {
            setProducts(response.data);
        });
    }, []);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href={'/products/new'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Add new product
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(product => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 line-clamp-2" title={product.title}>
                                            {product.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={'/products/edit/' + product._id} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Link>
                                        <Link href={'/products/delete/' + product._id} className="text-red-600 hover:text-red-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}