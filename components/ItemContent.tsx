"use client";
import React from "react";
import { CartProductType } from "./products/ProductDetails";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import SetQuantity from "./products/SetQuantity";
import { useCart } from "../hooks/useCart";
interface ItemContentProps {
  item: CartProductType;
 
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {handleRemoveProductFromCart,handleCartQtyIncrease,handleCartQtyDecrease} = useCart()
    return (
    <div className="text-gray-500 divide-y-2 divide-gray-200 section-articles flex flex-col">
      <div className="div-articles flex gap-x-4 py-4">
        <Link href={`/product/${item.id}`} className=" cursor-pointer basis-[50%]">
        <div className="relative border-2 rounded-md aspect-square flex  img-article bg-white">
          <Image
          
           fill
            className="rounded-lg w-full object-contain"
            src={item.images[0]}
            alt={item.title}
          />
        </div>
        </Link>
        <div className="detail-article basis-[50%] flex flex-col justify-between">
          <div>
            <p>{item.title}</p>
           
            <p className="font-semibold text-orange-500">{formatPrice(item.price)}</p>
           
          </div>
          <div className=" flex justify-between">
            <span
            onClick={() => handleRemoveProductFromCart(item)}       
            className="cursor-pointer font-semibold hover:underline hover:text-blue-900 ease duration-100 transition">Retirer</span>
            <SetQuantity 
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() =>{handleCartQtyIncrease(item)}}
            handleQtyDecrease={()=> {handleCartQtyDecrease(item)}}
            />
          
          </div>
        </div>
      </div>

      <div className="py-4">
        <p className="flex justify-between items-center">
          <span >Total</span>
          <span className="font-semibold text-blue-900">{formatPrice(item.price * item.quantity)}</span>
        </p>
      </div>
    
    </div>
  );
};

export default ItemContent;
