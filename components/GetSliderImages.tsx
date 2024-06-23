"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { useState } from 'react';
import { getAllImages } from '@/lib/products';
export type typeGetImage = {
  images: string[]
}[]
const GetSliderImages = ({category,title}:{
  category: string | null,
  title:string
}) => {
    const [allImages, setAllImages] = useState<typeGetImage | null>(null)
    const [isAllImages,setIsAllImages] = useState<boolean>(false)
    useEffect(()=>{
      const getImages = async()=>{
        try {
          if(category === null){
            const data = await getAllImages(category)
             if(data === null){
               setIsAllImages(false)
              return
             } 
            setAllImages(data)
          
            setIsAllImages(true)
          }  
            else{
              const data = await getAllImages(category)
              if(data === null){
                setIsAllImages(false)
                return
              } 
              setAllImages(data)
          
              setIsAllImages(true)
            } 
         
       
         } catch (error) {
           setIsAllImages(false)
         }
      }
     getImages()

    },[])
    
      if(!isAllImages) {
        return <div className='min-h-[200px] flex flex-col justify-center items-center text-sm text-blue-700'>
          <p>Waiting for load slider image...</p>

        </div>
      }
    return (
    <CarousselHome data = {allImages} titleCaroussel ={title}  />
  )
}

export default GetSliderImages