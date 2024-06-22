import {SignJWT, jwtVerify} from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { User } from '@prisma/client'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)
export async function encrypt(payload:any){
    return await new SignJWT(payload)
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("7200 sec from now")
    .sign(key)
    
}
export async function decrypt(input:string): Promise<any>{
    const  {payload} = await jwtVerify(input, key, {
        algorithms:['HS256'],

    })
    return payload
}
export async function createSession(user:User){
    
    const expires = new Date(Date.now() + 7200 * 1000)
    const session = await encrypt({user,expires})
    cookies().set("userSession",session,{expires,httpOnly:true});
}
export async function getSession(){
   const session  = cookies().get('userSession')?.value
   if(!session) return null
   return await decrypt(session)
}

export async function updateSession(request:NextRequest){
  const session = request.cookies.get('value')?.value
  if(!session) return 
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name:'session',
    value:await encrypt(parsed),
    httpOnly:true,
    expires:parsed.expires


  })
  return res
}
export async function logOut(){
    cookies().set("userSession"," ",{expires:new Date(0)})
}

