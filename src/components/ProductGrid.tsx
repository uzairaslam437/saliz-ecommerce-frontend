import React,{useState,useEffect} from "react";
import { ProductCard } from "./ProductCard";
import type { ProductDetails } from "@/types/Product";
import { fetchAllProducts } from "@/services/ProductServices";
import { useAuth } from "@/hooks/useAuth";

export const ProductGrid: React.FC = () => {
    const [products,setProducts] = useState<ProductDetails[]>([]);
    // const [loading,setLoading] = useState(false);

    const {accessToken} = useAuth();

    useEffect(() => {
            console.log("Product Grid Access Token",accessToken)
            const loadProducts = async () => {
                try{
                    if(accessToken){
                        const allProducts = await fetchAllProducts(accessToken);
                        setProducts(allProducts);
                      }
                }
                catch(error){
                    console.log('Error fetching products',error)
                }
            }
        loadProducts();
    },[])
    
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl} 
            name={product.name} 
            rating={product.rating} 
            price={product.price} 
          />)
        )}
      </div>
    </div>
  );
};
