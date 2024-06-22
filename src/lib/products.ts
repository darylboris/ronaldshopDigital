'use server'
const getProducts = async () => {
    try {
        let resp = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,category,brand,stock,rating,images,description')
    let data = await resp.json()
    console.log(data.products)
    return data.products
    } catch (error) {
        return null
        //throw error
        
    }
    

}
export default getProducts
export const getProductById = async(id:number) =>{
    try {
        let resp = await fetch(`https://dummyjson.com/products/${id}?limit=10&skip=10&select=title,price,category,brand,stock,rating,images,description`)
       
        
    let data = await resp.json()
    console.log(data)
    return data
    } catch (error) {
        throw error
        
    }


}