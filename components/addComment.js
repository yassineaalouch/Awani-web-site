import { useState } from "react";
import axios from "axios";
const AddComment = ({session,fetchData,review,cancelForm,id}) => {
    const [message,setMessage] = useState('')
    const [showLoginMessage, setShowLoginMessage] = useState(false);


    function cancel(){
        fetchData()
        setMessage('')
        cancelForm()
      }

      async function addComment(ev){
        ev.preventDefault()
        if (session){
          const data = {
            name:session?.user?.name,
            email:session?.user?.email,
            productID:id,
            comment: message,
            replyTo: review._id
          }
          await axios.post('/api/comment',data,{ headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }})
          setMessage('')
          fetchData()
          cancel()
        }else{
          setShowLoginMessage(true)
        }
      }

    return (
        <form onSubmit={(ev)=>addComment(ev)} className='flex items-start space-x-4'>

        <div className='flex-grow'>
            <textarea
                className='w-full bg-gray-100 text-right rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                rows='2'
                placeholder='...  أضف تعليقًا '
                value={message}
                required
                onChange={e=>setMessage(e.target.value)}
            ></textarea>

            <div className='flex justify-end items-center space-x-2 mt-2'>
                <button type='button' onClick={cancel} className=' bg-white border-2 border-black text-black hover:bg-black   hover:text-white px-4 py-1.5 rounded-lg font-medium  duration-300'>
                  إلغاء
                </button>
                <button type='submit' className=' bg-black border-2 border-black text-white hover:bg-white hover:text-black duration-300 px-4 py-1.5 rounded-lg font-medium '>
                    رد    
                </button>
            </div>
        </div>
    </form>
    );
}

export default AddComment;
