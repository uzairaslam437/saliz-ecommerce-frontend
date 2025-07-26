import type { ProductDetails } from "@/types/Product"

export const ProductCard : React.FC<ProductDetails> = (props) => {
    return(
        <div className="border p-4 rounded shadow">
            <img src={props.imageUrl} alt={props.name} className="w-full h-48 object-cover rounded"/>
            <h3 className="text-lg font-semibold mt-2">{props.name}</h3>
            <p className="text-yellow-500">{props.rating}</p>
            <p className="text-blue-600 font-bold">PKR{props.price}</p>
        </div>
    )
}