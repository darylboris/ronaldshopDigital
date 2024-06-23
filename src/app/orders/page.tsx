import React from 'react'
import Navbar from '../../../components/Navbar'
import { getOrdersByUserId } from '@/lib/orders'
import { redirect } from 'next/navigation'
import OrdersClient from './OrdersClient'
import Footer from '../../../components/Footer'
import authUser from '@/lib/user'
import order from "../../../public/order.jpg"
import Image from 'next/image'
const page = async() => {
  const user = await authUser()
  if(!user) redirect('/')
    const orders = await getOrdersByUserId(user.id)
    // if(!orders || orders.length === 0 ) return <p>Pas de commandes effectuées</p>

    return (
        <>
        
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar path={""} User = {user} />
      <main className="w-full flex flex-col mx-auto items-center grow min-h-[200px] py-8  text-xl">
  {!orders || orders.length === 0  ? (
    <>
    <Image src={order} alt="aucune commande" width={400} />
    <p className='text-blue-900 font-semibold'>Aucune commande effectuée pour l&apos;instant</p>
    </>
    
   

  )
  :
  (
    <OrdersClient orders = {orders} />

  )
}

   {/* <hr className="mx-14 border-2 border-orange-500 mb-4"/> */}
 
 

   
 
        </main>

      <Footer />
    </div>
  </>
  
  )
}

export default page