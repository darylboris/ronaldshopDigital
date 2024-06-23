"use client"
import React from 'react'
import { CartProductType } from './ProductDetails';
import Image from 'next/image'
import { typeProduct } from '@/app/page';
interface ProductImagesProps{
    cartProduct: CartProductType,
    product:typeProduct,
    
    handleSelectImage:(value:string) => void;
}

const ProductImage:React.FC<ProductImagesProps> = ({
    cartProduct,
    product,
    handleSelectImage,
}) => {
  return (
    <div className='grid grid-cols-6 gap-2
    h-full
    max-h-[500px]
    min-h-[300px]
    sm:min-h-[400px]'>
        <div className='flex
         flex-col
         items-center
         justify-center
         gap-4
         cursor-pointer
         border
       
         '>
            {product.images.map((image:string) => {
                return (
                    <div key={product.id}
                    onClick={() =>  handleSelectImage(image)}
                    className={`relative w-[80%]
                    aspect-square
                    rounded
                    border-orange-500
                    ${cartProduct.selectedImg === image ? 'border-[1.5px]': 'border-none'}
                    `}
                    ><Image src={image} alt={product.title} fill className='object-contain'/>
                    </div>
                )
            })}
         </div>
            <div className='col-span-5 relative aspect-square'>
                <Image fill className='w-full
                 h-full
                  object-contain'
                  src={cartProduct.selectedImg}
                  alt={cartProduct.title}
                  />
            </div>
    </div>
  )
}

export default ProductImage