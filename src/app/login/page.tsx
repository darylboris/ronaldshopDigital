import React from 'react'
import FormLogin from './FormLogin'
import authUser from '@/lib/user'
import { redirect } from 'next/navigation'
const Page = async () => {
    const currentUser  = await authUser()
    if(currentUser) redirect("/")
  return (
    <div  className="flex justify-center items-center bg-gray-300">
        <div className='text-center'>
        <h1 className='text-blue-900 '>Seconnecter sur RonaldShop</h1>
        <p>Ravi de vous retoruver à nouveau </p>
        </div>
        
      <FormLogin />
    </div>
  )
}

export default Page
