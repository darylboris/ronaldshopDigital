"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { useState } from 'react';
import { getImagesCaroussel } from '@/lib/actions';

const GetSliderImages = () => {
    const [allImage, setAllImage] = useState<ListBlobResultBlob[] | null>(null)
    const [isAllImage,setIsAllImage] = useState<boolean>(false)
    useEffect(()=>{
      const getAllImage = async()=>{
        try {
          const data = await getImagesCaroussel()
          setAllImage(data)
           setIsAllImage(true)
         } catch (error) {
           setIsAllImage(false)
         }
      }
     getAllImage()

    },[allImage])
    
      if(!isAllImage) {
        return null
      }
    return (
    <CarousselHome data = {allImage} titleCaroussel ={"Découvrez les produits de chez RonaldShop"}  />
  )
}

export default GetSliderImages