import { useContext } from "react";
import type { CartContextType } from "@/types/cart";
import { CartContext } from "@/contexts/CartContext";

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);

    if(!context){
        throw new Error('useCart must be inside a CartProvider')
    }

    return context;
}