
import { NextResponse } from "next/server";
import prisma from "../../../../db";
import { getCurrentUser } from "@/lib/actions";
export async function PUT(request: Request) {
  const user = await getCurrentUser()
  if(!user)  return NextResponse.error();
  if(user.role !== "ADMIN"){
    return NextResponse.error();
  } 
  const body = await request.json()
  const {id,inStock} = body
  const product = await prisma.product.update({
    where:{id:id},
    data:{inStock},
  })
  return NextResponse.json(product)
}
