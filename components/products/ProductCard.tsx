"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { truncateText } from "@/lib/truncateText";
import { formatPrice } from "@/lib/formatPrice";
import { Rating } from "@mui/material";
import { typeProduct } from "@/app/page";
export interface ProductCardProps{
  product:typeProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  
  
  const Router = useRouter();
  
  
  return (
    <div className="flex flex-col border-2 w-[300px]">
     
        {" "}
        <div 
        onClick={() => Router.push(`/product/${product.id}`)}
        className="relative grow p-4 overflow-hidden aspect-square hover:scale-105 transition flex  justify-center w-full h-[200px] cursor-pointer">
          <Image
          fill
            // width={300}
            // height={300}
            className="rounded-xl object-contain w-full"
            src={product.images[0]}
            alt={""}
          />
        </div>
      {/* </Link> */}

      <div className="text-gray-500 min-h-[50px] bg-slate-100 flex flex-col space-y-2 justify-center text-center px-3 py-4">
        <p className="text-orange-500">{truncateText(product.title)}</p>
        <div className="space-y-2">
          <p>{product.reviews.length} avis</p>
       
   

        <Rating value={product.rating} readOnly />
        <p className="text-blue-700 font-semibold">{formatPrice(product.price)}</p>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;
