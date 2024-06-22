import React from 'react'
import FormRegister from './FormRegister'
import { redirect } from 'next/navigation'
import authUser from '@/lib/user'
const Page = async () => {
    const currentUser  = await authUser()
    if(currentUser) redirect("/")
  return (
    <div  className="min-h-screen flex flex-col  justify-center items-center bg-gray-300">
        <div className='text-center'>
        <h1 className='text-blue-900 text-center'>S&apos;inscrire sur RonaldShop</h1>
        <p>Bienvenue parmi nous</p>
        </div>
        
      <FormRegister />
    </div>
  )
}

export default Page
