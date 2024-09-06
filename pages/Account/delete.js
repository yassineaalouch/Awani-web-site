import axios from 'axios';
import UserAccount from '../account';
import { signOut } from 'next-auth/react'; 
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session ) {
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { Session: JSON.parse(JSON.stringify(session)),
      },
    };
}

const Delete = ({Session}) => {
    console.log(Session)
    async function deleteAccount(){
        axios.delete('/api/UserHandler',{data:{_id:Session?.user?.id},
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
          },})
        .then(()=>{signOut({ callbackUrl: '/Login' })})

    }
    return (
        <UserAccount>
            <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Your Account</h2>
        <p className="text-gray-600 mb-4">
          Once you delete your account, all your invoices, orders, and other personal information will be permanently deleted. This action cannot be undone.
        </p>
        <p className="text-gray-600 font-semibold mb-4">
          Are you sure you want to proceed?
        </p>
          <button
            onClick={() => deleteAccount()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Yes, Delete My Account
          </button>
      </div>
    </div>
        </UserAccount>
    );
}

export default Delete;
