export const revalidate  = 0
import Image from "next/image";
import Navbar from "../../components/Navbar";
import prisma from "../../db";

import ProductCard from "../../components/products/ProductCard";
import Footer from "../../components/Footer";
import getProducts from "@/lib/products";
import GetSliderImages from "../../components/GetSliderImages";
import authUser from "@/lib/user";
export type typeProduct = {
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
    
  }[],
  images:string[]
}


export default async function Home() {  
  const currentUser = await authUser()

  const products:typeProduct[] = await getProducts()




  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar path={"/"} User = {currentUser} />
        <main className="grow">
     <header className="px-8 min-h-28 flex justify-center items-center text-blue-700 text-xl lg:text-2xl">
      <p className="flex flex-col f400:flex-row text-center text-2xl">Obtenez votre Toolkit à porté d&apos;un clic</p>
 
    </header> 
     <hr className="mx-14 border-2 border-orange-500 mb-4"/>
    
{/* <GetSliderImages /> */}
   <div >
      <div>
        {/* Mobile filter dialog */}
 
        <main className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
          {/* Product grid */}
          {!products || products.length === 0  ?
          (
            <p className="text-2xl">waiting for load products...</p>
          )
          :
          (
            <div className="mx-auto grid grid-cols-1 justify-items-center max-w-sm md:grid-cols-2 md:max-w-4xl lg:grid-cols-3 lg:max-w-5xl  xl:grid-cols-4 xl:max-w-6xl gap-16 min-h-[400px]">
            {products.map((data,index) =>{
              return (
                <ProductCard key={index} product={data} />
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

