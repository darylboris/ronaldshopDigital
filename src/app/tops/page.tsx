export const revalidate  = 0
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import ProductCard from "../../../components/products/ProductCard";
import Footer from "../../../components/Footer";
import shuffleProducts from "@/lib/shuffleProducts";
import GetSliderImages from "../../../components/GetSliderImages";
import authUser from "@/lib/user";
import { typeProduct } from "../page";
import { getProductsByCategory } from "@/lib/products";

export default async function Page() {  
   const currentUser = await authUser()

  const products:typeProduct[] = await getProductsByCategory("tops")


  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar path={"/tops"} User = {currentUser} />
        <main className="grow">
     <header className="px-8 min-h-28 flex justify-center items-center text-blue-700 text-xl lg:text-2xl">
      <p className="flex flex-col f400:flex-row text-center text-2xl">Obtenez votre produit chez <span className="font-bold">RonaldShop</span></p>
 
    </header> 
     <hr className="mx-14 border-2 border-orange-500 mb-4"/>
    
 <GetSliderImages category={"tops"} title={"Découvrez tous les produits de la catégorie TOPS chez RonaldShop"} /> 
   
      <div className="mt-8">
       
 
        <main className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
          {/* Product grid */}
          {!products || products.length === 0  ?
          (
            <p className="text-2xl text-blue-900">waiting for load products...</p>
          )
          :
          (
            <div className="mx-auto grid grid-cols-1 justify-items-center max-w-sm md:grid-cols-2 md:max-w-4xl lg:grid-cols-3 lg:max-w-5xl  xl:grid-cols-4 xl:max-w-6xl gap-8 min-h-[400px]">
            {shuffleProducts(products).map((data,index) =>{
              return (
                <ProductCard key={index} product={data} />
              )
            })}
           
          </div>
          )
          
          }
        
               
             
        </main>
      </div>
   
          </main>

        <Footer />
      </div>
    </>
  );
}

