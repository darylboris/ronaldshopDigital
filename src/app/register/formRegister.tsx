'use client'
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";

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
import { addUser } from "@/lib/user";
import toast from "react-hot-toast";
export const formSchemaRegister = z.object({
    username:z.string({
        message:"entrer le nom d'utilisateur",
    }),
    firstName:z.string({
        message:"entrer votre nom"
    }),
    lastName:z.string({
        message:"entrer votre prenom",
    }),
    password:z.string({
        message:"entrer votre mot de passe"
    }).regex(
        /^\S+$/,{
            message:"votre mot de passe ne doit pas contenir d'espaces"
        }
    )
})
const FormRegister = () => {
    const classInput = `px-4 py-2 focus:ring-blue-900 ring-4 rounded-md`
    const classLabel = `font-light text-blue-900 `
    const Router = useRouter()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchemaRegister>>({
        resolver: zodResolver(formSchemaRegister),
        defaultValues: {
          username: undefined,
          firstName: undefined,
          lastName: undefined,
          password: undefined,
       
        },
      });
      async function onSubmit(values: z.infer<typeof formSchemaRegister>) {
        setIsLoading(true)
        try {
            const existingUser = await addUser(values)
            CONSOLE.LOG(existingUser)
            if (existingUser === true){
                toast.success("nom d'utilisateur ou mot de passe deja utilise")
                return
            } 
             toast.success('inscription reussie')
             Router.refresh()
        } catch (error) {
            toast.error("impossible de se connecter au serveur",{
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
  
        <div className="max-w-[1000px] px-4 py-2 shadow-lg">
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
              name="firstName"
              render={({ field }) => (
                <FormItem className="">
                 
                  <FormLabel htmlFor="nom" className={classLabel}>
                      Nom
                    </FormLabel>
                    <FormControl  id="nom" className={`${classInput}`}>
                      <Input   type="text" {...field} />
                    </FormControl>
                  
                
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="">
           
                  <FormLabel htmlFor="prenom" className={classLabel}>
                      Prenom
                    </FormLabel>
                    <FormControl id="prenom" className={`${classInput}`}>
                      <Input type="text" {...field} />
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
          
                    >
                      <Input type="text" {...field} />
                    </FormControl>
                  
                 
                  <FormMessage />
                </FormItem>
              )}
            />

           
            {isLoading ? (
                 <div>
                 <Button
                 disabled
                   type="submit"
                   className="mb-2 w-full inline-flex font-semibold justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                 >
                    <Loader2 className="text-white  animate-spin mr-2" />
                 S&apos;inscrire
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
            
             S&apos;inscrire
            </Button>
          </div>
          )}
         
           
          </form>
        
        </Form>
        </div>
    
   
  )
}

export default FormRegister
