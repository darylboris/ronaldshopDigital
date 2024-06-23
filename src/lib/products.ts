'use server'
import getRandomInt from "./randomInt";
const getProducts = async () => {
    const randomNumber = getRandomInt();
    try {
        let resp = await fetch(`https://dummyjson.com/products?limit=10&skip=${randomNumber}&select=title,price,category,brand,stock,rating,images,description,reviews`)
    let data = await resp.json()
    console.log(data.products)
    return data.products
    } catch (error) {
        return null
        //throw error
        
    }
    

}
export default getProducts
export const getProductById = async(id:string) =>{
    try {
        let resp = await fetch(`https://dummyjson.com/products/${id}?select=title,price,category,brand,stock,rating,images,description,reviews`)
       
        
    let data = await resp.json()
    console.log(data)
    return data
    } catch (error) {
        throw error
        
    }


}
export const getAllImages = async(category:string | null ) => {
    const randomNumber = getRandomInt();
    try {
        // fetch('https://dummyjson.com/products/category/smartphones')
// .then(res => res.json())


        if(category === null ) {
            let resp = await fetch(`https://dummyjson.com/products?limit=10&skip=${randomNumber}&select=images`)
            let data = await resp.json()
            // console.log(data.products)
            return data.products
        } 
        else{
            // ?limit=10&skip=10&select=images
            let resp = await fetch(`https://dummyjson.com/products/category/${category}`)
        let data = await resp.json()
        console.log(data.products)
        return data.products
        }
               // let resp = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=images')
      
       
    } catch (error) {
        //throw error
        return null
        
    }
}

export const getProductsByCategory = async(category:string) => {
    try {
//         fetch('https://dummyjson.com/products/category/smartphones')
// .then(res => res.json())
// .then(console.log);
// ?limit=10&skip=10&select=title,price,category,brand,stock,rating,images,description
        let resp = await fetch(`https://dummyjson.com/products/category/${category}`)
        let data = await resp.json()
        console.log(data.products)
        return data.products
        

    } catch (error) {
        throw error
        
    }
}