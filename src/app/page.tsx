export const revalidate  = 0
import Image from "next/image";
import Navbar from "../../components/Navbar";
import prisma from "../../db";

import ProductCard from "../../components/products/ProductCard";
import Footer from "../../components/Footer";
import getProducts from "@/lib/products";
import { getCurrentUser } from "@/lib/actions";
import GetSliderImages from "../../components/GetSliderImages";
export type typeProducts = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  brand:string, 
  rating: number,
  stock: number,
  reviews: {    
      rating: number,
      comment: string,
      date:Date,
      reviewerName: string    
    
  }[]
}[]
export function noProducts(){

}

export default async function Home() {  
  const products:typeProducts = await getProducts()




  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar path={"/"} User = {user} />
        <main className="grow">
     <header className="px-8 min-h-28 flex justify-center items-center text-blue-700 text-xl lg:text-2xl">
      <p className="flex flex-col f400:flex-row text-center text-2xl">Obtenez votre Toolkit à porté d&apos;un clic</p>
 
    </header> 
     <hr className="mx-14 border-2 border-orange-500 mb-4"/>
    
<GetSliderImages />
   <div >
      <div>
        {/* Mobile filter dialog */}
 
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
          {/* Product grid */}
          {!products || products.length === 0  ?
          (
            <p className="text-2xl">waiting for load products...</p>
          )
          :
          (
            <div className="mx-auto grid grid-cols-1 justify-items-center max-w-sm md:grid-cols-2 md:max-w-4xl lg:grid-cols-3 lg:max-5xl  xl:grid-cols-4 gap-16 min-h-[400px]">
            {products.map((product,index) =>{
              return (
                <ProductCard key={index} data={product} />
              )
            })}
           
          </div>
          )
          
          }
        
               
             
        </main>
      </div>
    </div>
          </main>

        <Footer />
      </div>
    </>
  );
}

