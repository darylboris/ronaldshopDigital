import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { getOrdersByUserId } from '@/lib/orders'
import { redirect } from 'next/navigation'
import OrdersClient from './OrdersClient'
import Heading from '../../../components/Heading'
import Footer from '../../../components/Footer'
import authUser from '@/lib/user'

const page = async() => {
  const user = await authUser()
  if(!user) redirect('/')
    const orders = await getOrdersByUserId(user.id)
    if(!orders || orders.length === 0 ) return <p>Pas de commandes effectuées</p>

    return (
        <>
        
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar path={""} User = {user} />
      <main className="flex mx-auto items-center grow min-h-[200px] py-8  text-xl">
  

   {/* <hr className="mx-14 border-2 border-orange-500 mb-4"/> */}
 
    <OrdersClient orders = {orders} />


   
 
        </main>

      <Footer />
    </div>
  </>
  
  )
}

export default page