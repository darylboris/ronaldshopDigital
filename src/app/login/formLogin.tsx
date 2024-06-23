'use client'
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/user";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from 'react'

import { useState } from "react";
import toast from "react-hot-toast";
export const formSchemaLogin = z.object({
    username:z.string({
        message:"entrer le nom d'utilisateur",
    }),
 
    password:z.string({
        message:"entrer votre mot de passe"
    }).regex(
        /^\S+$/,{
            message:"votre mot de passe ne doit pas contenir d'espaces"
        }
    )
})
const FormLogin = () => {
     const classInput = `px-4 py-2 font-light rounded-lg border-gray-400 focus:ring-blue-700  outline-none focus:ring-2 ring-offset-2 border`
    const classLabel = `font-light text-blue-900 `
    const Router = useRouter()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
          username: undefined,
        
          password: undefined,
       
        },
      });
      async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
        setIsLoading(true)
        console.log(values)
        try {
            const user = await getUser(values)
            if(!user) toast.error("identifiants incorrectes",{
                style:{
                    backgroundColor:"red",
                     color:"white"
                }
            })
                else{
            toast.success("connexion reussie")
            }
        } catch (error) {
            toast.error("une erreur s'est produite",{
                style:{
                    backgroundColor:"red",
                }
            })
          
        }
        finally{
            setIsLoading(false)
        }

      }
  return (
   
        <div className="w-full">
        <Form {...form}  >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="">
                
                  <FormLabel htmlFor="username" className={`${classLabel}`}>
                      Nom d&apos;utilisateur
                    </FormLabel>
                    <FormControl id="username" className={`${classInput}`}>
                      <Input
                       
                       
                        type="text"
                        {...field}
                      />
                    </FormControl>
                 
               

                  <FormMessage />
                </FormItem>
              )}
            />

      
          
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
               
                  <FormLabel htmlFor="pwd" className={classLabel}>
                      Mot de passe
                    </FormLabel>
                    <FormControl
                      id="pwd"
                      className={`${classInput}`}
          
                    >
                      <Input type="password" {...field} />
                    </FormControl>
                  
                 
                  <FormMessage />
                </FormItem>
              )}
            />

<p className="text-sm mt-1 font-light">Pas encore de compte?<span><a href="/login" className="italic hover:font-bold hover:text-blue-900 duration transition">Creer en un!</a></span></p>
            {isLoading ? (
                 <div>
                 <Button
                 disabled
                   type="submit"
                   className="mb-2 w-full inline-flex font-semibold justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                 >
                    <Loader2 className="text-white  animate-spin mr-2" />
                  Se connecter
                 </Button>
               </div>
            )
          :
          (
            <div>
            <Button
              type="submit"
              className="mb-2 w-full flex flex-col font-semibold justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
            >
            
            Se connecter
            </Button>
          </div>
          )}
         
           
          </form>
        
        </Form>
        </div>
    

  )
}

export default FormLogin
