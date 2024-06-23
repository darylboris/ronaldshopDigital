"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import SetQuantity from './SetQuantity'

import ProductImage from './ProductImage'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '@/lib/formatPrice'
import { Rating } from '@mui/material'
import { LucideCheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ProductCardProps } from './ProductCard'

const Horizontal = () => {
  return <hr className='w-[30%] my-2'/>
}
export type CartProductType = {
  id:number,
  title:string,
  description?:string,
  category:string
  brand?:string,
  selectedImg: string,
  quantity:number,
  price:number,
  images:string[]

}

const ProductDetails:React.FC<ProductCardProps> = ({product}) => {
  
  
 
  const Router = useRouter()
  
  const {handleAddProductToCart,cartProducts}  = useCart()
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false)
  
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id:product?.id,
    title:product.title,
    description:product.description,
    category:product.category,
    brand:product.brand,
    selectedImg: product.images[0],
    quantity:1,
    price:product.price,
    images:product.images
  })
  console.log(cartProducts)
  useEffect(()=>{
    setIsProductInCart(false)
    if(cartProducts){
      const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
      if(existingIndex > -1) setIsProductInCart(true)
    }
  },[cartProducts])  
  const handleQtyIncrease = useCallback(() =>{
    if(cartProduct.quantity === product.stock) return 
    setCartProduct((prev) =>{
      return {...prev, quantity:prev.quantity++}
    })
  },[cartProduct])
  const handleSelectImage = useCallback((value:string) =>{
   setCartProduct((prev)=>{
    return {...prev,selectedImg:value}
   }) 
  },
  [cartProduct.selectedImg]
  )
  const handleQtyDecrease = useCallback(() =>{
    if(cartProduct.quantity === 1) return
    setCartProduct((prev) =>{
      return {...prev, quantity:prev.quantity--}
    })
  },[cartProduct])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
     <ProductImage cartProduct={cartProduct} product={product} handleSelectImage={handleSelectImage} />
      <div className='flex flex-col gap-1 text-gray-500 text-sm'>
        <h2 className='text-3xl font-medium text-blue-700'>{product.title}</h2>
        <p className='font-bold'>{formatPrice(product.price)}</p>
       
        <div className='flex items-center gap-2'>
          <Rating value={product.rating} readOnly/>
          <p className="text-center text-gray-500">
            {product.reviews?.length ?? 0} avis
          </p>

</div>
   
        <Horizontal />
        <div className='text-justify'>{product.description}</div>
        <Horizontal />
        <div>
          <span className='font-semibold'>Catégorie: </span>
          <span>{product.category}</span>
        </div>
        <div>
          <span className='font-semibold'>marque: </span>
          <span>{product.brand}</span>
        </div>
        {/* <div className={product.inStock ? "text-teal-400" : "text-red-500"}>
          {product.inStock ? "En stock" : "Stock épuisé"}
        </div> */}
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className='mb-2 text-gray-500 flex items-center gap-1'>
              <LucideCheckCircle className='text-teal-400' size={20} />
              <span>Produit ajouté au panier</span>
            </p>
            <div><Button
           

onClick={()=>Router.push("/cart") }
className='border bg-transparent border-orange-500 max-w-[300px] text-orange-500 hover:bg-transparent'>Voir le panier</Button></div>


          </>
        )
      :(
        <>
     
       
        <SetQuantity cartProduct = {cartProduct}
        handleQtyIncrease={handleQtyIncrease}
        handleQtyDecrease={handleQtyDecrease}
        />
        <Horizontal />
        <div><Button

        onClick={()=> handleAddProductToCart(cartProduct)}
        className='max-w-[300px] bg-orange-500 hover:bg-orange-700'>Ajouter au panier</Button></div>
        </>
      )}
      
      
        
      </div>
    </div>
  )
}

export default ProductDetails