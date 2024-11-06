// import { useState,useEffect } from "react";
// import axios from "axios";
// import Emails from "../Emails";
// import { FaPlus } from "react-icons/fa6";
// import { getSession } from "next-auth/react";

// export async function getServerSideProps(context) {
//     const session = await getSession(context);

//     if (!session || session.user.role !== 'admin') {
//       return {
//         redirect: {
//           destination: '/Login',
//           permanent: false,
//         },
//       };
//     }

//     return {
//       props: { session },
//     };
//   }
// export default function Q_A_Admin(){
//     const [Q_A_List ,setQ_A_List]= useState([])
//     const [isShow ,setIsShow]= useState('')
//     const [answer,setAnswer] = useState("")
//     const questionsToAnswer = Q_A_List.filter(question =>question.isAnswered=false).length;
//     const [wantToAddNew,setWantToAddNew]=useState(false)
//     const [addAnswer,setAddAnswer]=useState('')
//     const [addQuestion,setAddQuestion]=useState('')



//     useEffect(() => {
//         getQuestions() 
//     },[]);

//     async function getQuestions(){
//         await axios.get('/api/Question_Answer',
//             {
//                 headers: {
//                   'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
//                 }}
//         ).then(result=>{
//             const list =result.data
//             setQ_A_List(list.reverse())
//         });
//     }

//     function AddNew(){
//         setWantToAddNew(!wantToAddNew)
//     }

//     function showQA(QA){
//         setIsShow(QA._id)
//         getQuestions()
//         setAnswer(QA.answer || "");
//     }

//     function hideQA(){
//         setIsShow('')
//         getQuestions() 
//     }

//     async function sendAnswer(e) {
//         e.preventDefault();

//         try {
//             await axios.put(
//                 '/api/Question_Answer',
//                 { id: isShow, answer }, // Données envoyées dans le corps de la requête
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoi de la clé API dans les headers
//                     }
//                 }
//             );
//             setAnswer(''); // Réinitialisation de la réponse
//         } catch (error) {
//             console.error('Erreur lors de l’envoi de la réponse:', error);
//         }
//     }

//     async function deleteQA(QA) {
//         await axios.delete(`/api/Question_Answer`, { data: { id: QA._id },

//                 headers: {
//                   'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
//                 }});
//         getQuestions();
//     }

//     async function AddNewQA(e) {
//         e.preventDefault()
//         await axios.post('/api/Question_Answer',{question:addQuestion,answer:addAnswer},
//             {
//                 headers: {
//                   'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
//                 }})
//         setAddAnswer('')
//         setAddQuestion('')
//         getQuestions()

//     }

//     function setAnswerFunction(e){
//        setAnswer(e)
//     }

//     return(
//         <Emails>
//            <table className="w-full">
//                 <thead className="w-full text-left mb-1">
//                     <tr>
//                         <th className="p-1 pr-2 bg-gray-200 ">
//                             <div className="flex justify-between items-center">
//                                 Q_A
//                                 <FaPlus className=" cursor-pointer" onClick={()=>AddNew()}/>
//                             </div>
//                             {wantToAddNew&&
//                                 <div className="bg-slate-100 rounded-md p-2 mt-3 pl-5">
//                                     <form onSubmit={AddNewQA} className=" gap-2 flex-col flex">
//                                         <label className="block">Question:</label>
//                                         <input required type="text" value={addQuestion} onChange={(e)=>setAddQuestion(e.target.value)} placeholder="question..." className="rounded-md border-[1.5px] focus:border-green-300 focus:outline-none p-1 w-full font-normal"/><br/>
//                                         <label className="block">Answer:</label>
//                                         <textarea required type="text" value={addAnswer} onChange={(e)=>setAddAnswer(e.target.value)} placeholder="answer..." className="p-1 rounded-md border-[1.5px] focus:border-green-300 focus:outline-none w-full font-normal"/>
//                                         <button className="block border-2 bg-green-300 hover:bg-green-400 p-1 rounded-md " type="submit">Add</button>
//                                     </form>
//                                 </div>
//                             }
//                         </th>


//                     </tr>
//                 </thead>


//                 {Q_A_List.length!=0 && Q_A_List.map(QA=>(
//                         <div key={QA._id} className="flex-col flex w-full">
//                             <div className="shadow-lg p-1 flex justify-between items-center" >

//                                 <td>{QA.question}</td>
//                                 {/* les icons */}
//                                 <div className="flex-col items-center">
//                                     {isShow!==QA._id?
//                                         <svg onClick={()=>showQA(QA)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 hover:text-slate-900">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                                         </svg>
//                                     :
//                                         <svg onClick={hideQA} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 hover:text-slate-900">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
//                                         </svg>
//                                     }

//                                     <svg onClick={()=>deleteQA(QA)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 hover:text-red-500">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {isShow===QA._id&& 

//                                 <div className="mt-2 shadow-md mb-3 bg-slate-100 p-4">
//                                     <div className="pb-1 text-sm">Answer:</div>
//                                     <form onSubmit={sendAnswer}>
//                                         <textarea
//                                         required 
//                                         value={answer}
//                                         onChange={(e)=> setAnswerFunction(e.target.value,QA)}
//                                         placeholder="entre the answer ..." 
//                                         className="w-full p-2 rounded-md"
//                                         />
//                                         <button type="submit">{QA.isAnswered? "Update":"Replay"}</button>
//                                     </form>
//                                 </div>

//                             }

//                         </div>

//                 ))}


//             </table>
//         </Emails>
//     );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import Emails from "../Emails";
import { FaPlus, FaEye, FaEyeSlash, FaTrash, FaPen } from "react-icons/fa";
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

export default function Q_A_Admin() {
    const [Q_A_List, setQ_A_List] = useState([])
    const [isShow, setIsShow] = useState('')
    const [answer, setAnswer] = useState("")
    const [wantToAddNew, setWantToAddNew] = useState(false)
    const [addAnswer, setAddAnswer] = useState('')
    const [addQuestion, setAddQuestion] = useState('')

    const questionsToAnswer = Q_A_List.filter(question => !question.isAnswered).length;

    useEffect(() => {
        getQuestions()
    }, []);

    async function getQuestions() {
        try {
            const result = await axios.get('/api/Question_Answer', {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
                }
            });
            setQ_A_List(result.data.reverse());
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    function AddNew() {
        setWantToAddNew(!wantToAddNew)
    }

    function showQA(QA) {
        setIsShow(QA._id)
        setAnswer(QA.answer || "");
    }

    function hideQA() {
        setIsShow('')
    }

    async function sendAnswer(e) {
        e.preventDefault();
        try {
            await axios.put(
                '/api/Question_Answer',
                { id: isShow, answer },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
                    }
                }
            );
            setAnswer('');
            getQuestions();
        } catch (error) {
            console.error('Error sending answer:', error);
        }
    }

    async function deleteQA(QA) {
        try {
            await axios.delete(`/api/Question_Answer`, {
                data: { id: QA._id },
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
                }
            });
            getQuestions();
        } catch (error) {
            console.error('Error deleting Q&A:', error);
        }
    }

    async function AddNewQA(e) {
        e.preventDefault()
        try {
            await axios.post('/api/Question_Answer',
                { question: addQuestion, answer: addAnswer },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
                    }
                }
            );
            setAddAnswer('')
            setAddQuestion('')
            setWantToAddNew(false)
            getQuestions()
        } catch (error) {
            console.error('Error adding new Q&A:', error);
        }
    }

    return (
        <Emails>
            <div className=" mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Q&A Administration</h1>
                            <button
                                onClick={AddNew}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                            >
                                <FaPlus className="mr-2" /> Add New Q&A
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            Questions to answer: <span className="font-semibold">{questionsToAnswer}</span>
                        </p>
                    </div>

                    {wantToAddNew && (
                        <div className="p-6 border-b border-gray-200">
                            <form onSubmit={AddNewQA} className="space-y-4">
                                <div>
                                    <label htmlFor="newQuestion" className="block text-sm font-medium text-gray-700">New Question:</label>
                                    <input
                                        id="newQuestion"
                                        type="text"
                                        value={addQuestion}
                                        onChange={(e) => setAddQuestion(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newAnswer" className="block text-sm font-medium text-gray-700">New Answer:</label>
                                    <textarea
                                        id="newAnswer"
                                        value={addAnswer}
                                        onChange={(e) => setAddAnswer(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                    Add Q&A
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="divide-y divide-gray-200">
                        {Q_A_List.map((QA) => (
                            <div key={QA._id} className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-medium text-gray-900">{QA.question}</h3>
                                        {QA.isAnswered && (
                                            <p className="mt-1 text-sm text-gray-600">Status: <span className="text-green-600 font-semibold">Answered</span></p>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => isShow === QA._id ? hideQA() : showQA(QA)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            {isShow === QA._id ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                        </button>
                                        <button
                                            onClick={() => deleteQA(QA)}
                                            className="text-gray-400 hover:text-red-600"
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                    </div>
                                </div>

                                {isShow === QA._id && (
                                    <div className="mt-4">
                                        <form onSubmit={sendAnswer} className="space-y-4">
                                            <div>
                                                <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer:</label>
                                                <textarea
                                                    id="answer"
                                                    value={answer}
                                                    onChange={(e) => setAnswer(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                    rows="3"
                                                    required
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
                                                <FaPen className="mr-2" /> {QA.isAnswered ? "Update Answer" : "Submit Answer"}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Emails>
    );
}