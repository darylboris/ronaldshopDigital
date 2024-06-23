import { logOut } from "@/lib/session"
import authUser from "@/lib/user"
import { NextResponse } from "next/server"

export async function POST(request:Request){
     const currentUser = await authUser()
     if(!currentUser){
         return NextResponse.error()
       
       
     }    
 await logOut()
 return NextResponse.json({message:'deconnexion reussie'})

}