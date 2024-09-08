"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "./Nav";

  
export default function Layout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [extend,setExtend] = useState(false)
  function translateNavBar(){
    setExtend(!extend)
}

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/Login');
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="w-screen h-screen flex justify-center items-center font-bold size-52">Loading...</p>;
  }

  if (status === "authenticated" && session.user.role !== 'admin') {
    router.push('/Login');
    return null;
  }
    return (
          <div className=" min-h-screen relative pt-8 flex lg:grid grid-cols-12 lg:pt-0 ">
            <div className={`${extend?"col-span-1":"col-span-1"} z-30 transition-all duration-500`}>
              <Nav extendNavBarFunction={translateNavBar}/> {/*le menu dans le gauche dans le admine dashbord */}
            </div>
          <div className={`bg-white overflow-auto lg:place-self-end lg:w-[95%] lg:origin-left lg:absolute top-0 right-0 lg::col-span-11 transition-all duration-500 ml-2 lg:ml-0 flex-grow mt-2 mr-2 mb-2 rounded-lg lg:pl-0 p-4`}>
              {children}{/*cette element doit se changer a chaque fois on clique sur un element dans le menu dans le dashbord : c'est lelement ou s'affiche le info ... */}
          </div>
          
         </div>
    );
}
//Revofeed123