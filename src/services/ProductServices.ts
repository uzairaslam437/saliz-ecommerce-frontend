import type { ProductDetails } from "@/types/Product";


export const fetchAllProducts = async(accessToken: string) : Promise<ProductDetails[] | undefined> =>{
    
    try{
        console.log("body of fetch all prods")
        const res = await fetch("http://localhost:3002/product/all",{
            method: 'GET',
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        });

        const data = await res.json();
        console.log(`Products: ${data.products}`)

        if(!res.ok){
            throw new Error("Unable to fetch products")
        }

        return data.products;
    }
    catch(err : any){
        console.log("Unable to get products",err)
    }
}