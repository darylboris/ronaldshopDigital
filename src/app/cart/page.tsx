import React from 'react'
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer'

import CartClient from '../../../components/CartClient';

import authUser from '@/lib/user';
const Page = async () => {
  const user = await authUser()

  return (
    <>
     <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar path={""}   User = {user} />
        <main className="grow py-4 min-h-[400px] flex flex-col justify-center items-center">
    <CartClient User =  {user} />
        {/* <ShoppingCart authentificate = {authentificated}/> */}
    
   
          </main>

        <Footer />
      </div>
   
       
    </>
  )
}

export default Page