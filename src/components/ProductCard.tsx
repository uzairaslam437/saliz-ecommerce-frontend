import type { ProductDetails } from "@/types/Product"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProductCard : React.FC<ProductDetails> = (props) => {

    const navigate = useNavigate();
    const {accessToken} = useAuth();

    const handleCardClick = async () => {
        try{
            const res = await fetch(`http://localhost:3002/product/${props.id}`,{
                method: `GET`,
                headers: {'authorization': `Bearer ${accessToken}`}
            });

            const data = await res.json();

            if(!res.ok){
                console.log(`Error getting product details`)
                throw new Error('Error getting product details')
            }

            navigate(`/products/${props.id}`,{state:{product: data}})
        }
        catch(error){
            console.log(`Error: ${error}`)
        }
    }
    
    return (
    <div
      onClick={handleCardClick}
      className="border p-4 rounded shadow transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <img
        src={props.imageUrl}
        alt={props.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{props.name}</h3>
      <p className="text-yellow-500">{props.rating}</p>
      <p className="text-blue-600 font-bold">PKR {props.price}</p>
    </div>
  );
}