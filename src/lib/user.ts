'use server'
import prisma from "../../db"
import * as z from "zod";
import { createSession, getSession } from "./session"
import { formSchemaLogin } from "@/app/login/FormLogin";
import { formSchemaRegister } from "@/app/register/FormRegister";
export default async function authUser(){
    const session = await getSession()
    if(!session) return null
    const userId = session.user.id
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        return user
    } catch (error) {
        throw error
    }

}
export  async function getUser(values:z.infer<typeof formSchemaLogin>){
    try {
        const user = await prisma.user.findUnique({
            where:{
                username:values.username,
                password:values.password
            },
            
        })
        if(!user) return null
        await createSession(user)
        return user
    } catch (error) {
        throw error
    }

}
export async function addUser(values:z.infer<typeof formSchemaRegister>){
    try {
        if(await existingUser(values)) return true
    const user = await prisma.user.create({
        data:{
            firstName:values.firstName,
            lastName:values.lastName,
            username:values.username,
            password:values.password

        }
    })
    await createSession(user)
    return user
    } catch (error) {
        throw error
    }
   
    
}
export async function existingUser(user:z.infer<typeof formSchemaRegister>){
    const existingUser = await prisma.user.findFirst({
        where:{
            OR:[
                {
                    username:user.username,
                },
               { password:user.password

               }
            ]
          
        }
      
    })
    if(existingUser) return true
    else return false

}