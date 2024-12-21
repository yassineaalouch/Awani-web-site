import { useState } from 'react';
import Link from 'next/link';
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from 'next-auth/react';
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/router";

export default function SideBarUserAccount() {
  const router = useRouter();
  const {pathname} = router;
  return (
    <div className="flex">
       
      {/* Sidebar for large screens */}

      <aside className="md:block w-screen md:w-fit  text-black h-fit md:border-l md:border-r md:border-gray-300">
        <div className="md:p-4 border-b p-2 md:border-t border-gray-300">
          <h2 className="text-xl text-center font-semibold">My account</h2>
        </div>
        <ul className="mt-4 flex flex-wrap justify-center border md:block" >
          <li className='md:border-b border-gray-300'>
            <Link
              href={'/account'}
              className={`block w-full text-left px-4 py-2 ${
                pathname.includes('/account')? 'bg-yellow-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              My account
            </Link>
          </li>
          <li className='md:border-b border-gray-300'>
            <Link 
              href={'/Account/commands'}
              className={`block w-full text-left px-4 py-2 ${
                pathname.includes('/Account/commands')? 'bg-yellow-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              My orders
            </Link>
          </li>

          <li className='md:border-b border-gray-300'>
            <Link
            href={'/Account/delete'}
            className={`flex items-center gap-3 w-full text-left px-4 py-2 ${
              pathname.includes('/Account/delete')? 'bg-yellow-500 text-white' : 'hover:bg-gray-200'
            }`}
            >
              Delete Account
            </Link>
          </li>

          <li className='md:border-b border-gray-300'>
            <Link
              href={'/'}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 ${
                pathname.includes('/4')?'bg-yellow-500 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => { signOut({ callbackUrl: '/Login' }); }}
            >
              <div className='block md:hidden'>Logout</div>
              <div className='hidden md:block'><RiLogoutBoxLine size={25} /></div>
              <div className='block md:hidden'><IoIosLogOut size={25} /></div>
              <div className='hidden md:block'>Logout</div>
            </Link>
          </li>
        </ul>
      </aside>



    </div>
  );
}
