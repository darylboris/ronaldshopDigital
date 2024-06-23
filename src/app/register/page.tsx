import React from 'react'
import FormRegister from './FormRegister'
import { redirect } from 'next/navigation'
import authUser from '@/lib/user'

const Page = async () => {
    const currentUser  = await authUser()
    if(currentUser) redirect("/")
  return (
<main  className="min-h-screen flex  justify-center items-center bg-gray-100">
<div className='flex flex-col justify-center items-center'>
    
    <div className='text-center mb-3'>
    <h1 className='text-blue-900 text-cente text-3xl font-bold mb-8'>S&apos;inscrire sur RonaldShop</h1>
    <p className='text-blue-700 text-xl'>Ravi de vous avoir parmi nous, inscris toi dès maintenant!</p>
    </div>
    
  <FormRegister />
</div>

</main>
   
  )
}

export default Page
