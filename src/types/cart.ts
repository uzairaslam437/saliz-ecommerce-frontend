import type { ReactNode } from "react";

export interface Product{
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    stock?: number;
}

export interface CartItem extends Product{
    quantity: number
}

export interface CartState{
    items: CartItem[];
    totalItems: number;
    subTotal: number;
    total: number
} 

export interface CartContextType{
    state: CartState;
    addToCart: (product: Product,quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId:string,quantity: number) => void;
    isInCart: (productId: string) => boolean;
    clearCart: () => void;
    quantityOfItem: (productId: string) => number;
}

export interface CartProviderProps{
    children: ReactNode;
}