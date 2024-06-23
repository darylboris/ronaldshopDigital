
import { NextResponse } from "next/server";
import prisma from "../../../../db";
import authUser from "@/lib/user";
import { CartProductType } from "../../../../components/products/ProductDetails";
const calculateOrderAmount = (items:CartProductType[]) =>{
   if(items.length === 0) return NextResponse.json({error:"votre carte est vide"},{status:403})
  const totalPrice = items.reduce((acc,item)=>{
      const itemTotal = item.price * item.quantity
      return acc + itemTotal;
  },0)
  const price:any = Math.floor(totalPrice)
  return price
}
export async function POST(request: Request) {
  const currentUser = await authUser()
 // if(!currentUser)  return NextResponse.error();
 if(!currentUser) return NextResponse.json({error:"Pas autorisé"},{status:401})

  const body = await request.json()
  //console.log(body.)
  const {items} = body
  const total = calculateOrderAmount(items)
const order = await prisma.order.create({
  data:{
    user:{connect:{id:currentUser.id}},
    currency:'FCFA',
    status:'pending',
    deliveryStatus:"pending",
    products:items,
    amount:total
  }
})
  return NextResponse.json(order)
}
