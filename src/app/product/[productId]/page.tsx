import React from 'react'
import Footer from '../../../../components/Footer'
import Navbar from '../../../../components/Navbar';

import ProductDetails from '../../../../components/products/ProductDetails';
import ListRating from './ListRating';
import { getProductById } from '@/lib/products';

import authUser from '@/lib/user';
import { typeProduct } from '@/app/page';


interface IParams {
    productId:string
}
const Product = async ({params} : {params:IParams}) => {
const data:typeProduct =await getProductById(params.productId)


if(!data) return 
 const currentUser = await authUser()
    console.log(params)
   
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
     <Navbar User={currentUser}/>
    <main className="grow px-8 py-4">
      <ProductDetails product={data}/>
      <div className='flex flex-col mt-20 gap-4'>
      
       <ListRating product={data} />
        </div>
       </main>

    <Footer />
  </div>
  )
}

export default  Product