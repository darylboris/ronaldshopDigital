"use client";
import React from "react";
import { useCart } from "../hooks/useCart";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/lib/formatPrice";
import { User,Order } from "@prisma/client";
import sCart from '../public/sCart.svg'
import axios from "axios";
import toast from "react-hot-toast";
import { CartProductType } from "./products/ProductDetails";
const CartClient = ({User}:{User:User | null}
) => {
  const Router = useRouter();
  const cartItems:any = localStorage.getItem('vStoreCartItems')
        console.log(cartItems)
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
  console.log(cProducts)
        const { cartProducts,handleClearCart,cartTotalAmount } = useCart();
  console.log(cartProducts)
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="text-gray-500 flex flex-col justify-center items-center space-y-2">
        <Image src={sCart} alt="panier dachat vide" width={500} />
       
        <p className="text-center">Votre panier est vide</p>
        <Link
          href={"/"}
          className="transition hover:text-blue-900 cursor-pointer justify-center inline-flex "
        >
          <ArrowLeft />
          <span>Poursuivre les achats</span>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-[300px] sm:w-[600px]">
         {cartProducts.map((item)=>{
            return <ItemContent key={item.id} item={item}  />
         })}
         <div
         onClick={() => handleClearCart()}
          className="pb-4"><Button className="w-full rounded-log text-orange-500 bg-ranparent hover:bg-transparent border-2 border-orange-500">Vider le panier</Button></div>
           <div>
           <div className="text-gray-500">
        <p className="flex justify-between">
          <span>Prix Total</span>
          <span className="font-semibold text-orange-500">{formatPrice(cartTotalAmount)}</span>
        </p>
      </div>
    

        {User ? (
          <Button
           
          onClick={()=>{fetch('/api/order',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                items:cartProducts,              
                
            })
          }).then((res)=>{
            if(res.status === 401)  return Router.push('/login')
              if(res.status === 403) return Router.push('/')
             
            return res.json()
          }).then((data)=>{
            console.log(data)
            toast.success("commande effectuée")
            handleClearCart()
            Router.refresh()
          })
          .catch((error)=>{
            console.log(error)
            toast.error("une erreur s'est produite",{
              style:{
                  backgroundColor:"red",
                  color:"white"
              }
          })
          })
        }}
      
            className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            Commander
          </Button>
        ) : (
          <Button
          onClick={()=>{Router.push('/login')}}
           
            className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            Connecter vous afin de passer la commande
          </Button>
        )}

        <Link
          href={"/"}
          className="transition text-gray-500 hover:text-blue-700 cursor-pointer justify-center inline-flex "
        >
          <ArrowLeft />
          <span >Poursuivre les achats</span>
        </Link>
      </div>
    
    </div>
  );
};

export default CartClient;
