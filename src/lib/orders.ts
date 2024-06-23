import prisma from "../../db"
export const getOrdersByUserId = async(userId:string) => {
    try {
      const orders = await prisma.order.findMany({
          include:{
              user:true,
              
          },
          orderBy:{
              createdDate:"desc"
          },
          where:{
            userId:userId
          }
      })
      if(!orders) return null
      return orders
  } catch (error) {
      return null
  }
  
   }