import React from 'react'
import FormLogin from './FormLogin'
import authUser from '@/lib/user'
import { redirect } from 'next/navigation'
const Page = async () => {
    const currentUser  = await authUser()
    if(currentUser) redirect("/")
  return (
<main  className="min-h-screen flex  justify-center items-center bg-gray-100">
<div  className="flex flex-col justify-center items-center">
        <div className='text-center mb-3'>
        <h1 className='text-blue-900 text-cente text-3xl font-bold mb-8'>Seconnecter sur RonaldShop</h1>
        <p className='text-blue-700 text-xl'>Ravi de vous retoruver à nouveau </p>
        </div>
        
      <FormLogin />
    </div>
</main>
  
  )
}

export default Page
