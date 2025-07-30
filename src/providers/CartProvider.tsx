import { useReducer } from "react";
import type { Product,CartItem,CartState,CartContextType,CartProviderProps } from '@/types/cart';
import { CartContext } from "@/contexts/CartContext";

type CartAction = 
    | {type: 'ADD_TO_CART',payload: {product: Product,quantity: number}}
    | {type:'REMOVE_FROM_CART',payload: {productId: string}}
    | {type:'UPDATE_QUANTITY',payload: {productId: string,quantity: number}}
    | {type: 'CLEAR_CART'};

const InitialState: CartState = {
    items: [],
    totalItems: 0,
    subTotal: 0,
    total: 0
}

const calculateTotal = (items: CartItem[]) => {
    const totalItems = items.reduce((sum,item) => sum + item.quantity , 0);
    const subTotal  = items.reduce((sum,item) => sum + (item.price * item.quantity) , 0);

    const total = subTotal

    return {totalItems,subTotal,total}
}

const CartReducer = (state : CartState , action: CartAction) => {
    switch(action.type){
        case 'ADD_TO_CART':{
            const {product , quantity} = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === product.id);

            let newItems : CartItem[];

            if(existingItemIndex > 0){
                newItems = state.items.map((item,index) => 
                    existingItemIndex === index ? 
                        {...item,quantity: item.quantity + quantity}
                        : item
                )
            }
            else{
                newItems = [...state.items, {...product,quantity}]
            }

            const totals = calculateTotal(newItems);

            return {items :newItems,
                    ...totals
            }
        }
        case 'REMOVE_FROM_CART':{
            const newItems = state.items.filter((item)=> item.id !== action.payload.productId);
            const totals   = calculateTotal(newItems);

            return{
                items: newItems,
                ...totals
            }
        }
        case 'UPDATE_QUANTITY':{
            const {productId , quantity} = action.payload;

            if(quantity <= 0){
                const newItems = state.items.filter((item) => item.id !== productId);
                const totals  = calculateTotal(newItems);

                return {
                    items: newItems,
                    ...totals
                }
            }
            else{
                const newItems = state.items.map((item) => 
                    item.id === productId ?
                    {...item , quantity: item.quantity + quantity}
                    : item
                )

                const totals =  calculateTotal(newItems);

                return {
                    items: newItems,
                    ...totals
                }
            }
        }
        case 'CLEAR_CART':
            return InitialState;
        default:
            return state
    }
}


export const CartContextProvider: React.FC<CartProviderProps> = ({children}) => {
    const [state,dispatch] = useReducer(CartReducer,InitialState);

    const addToCart = (product: Product,quantity: number = 1) => {
        dispatch({
            type: `ADD_TO_CART`,
            payload: {product,quantity}
        })
    }

    const removeFromCart = (productId: string) => {
        dispatch({
            type:'REMOVE_FROM_CART',
            payload: {productId}
        })
    }

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: {productId,quantity}
        })
    }

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART'
        })
    }

    const isInCart = (productId: string) : boolean => {
        return state.items.some((item) => item.id === productId)
    }

    const quantityOfItem = (productId : string) : number => {
        const item = state.items.find( item => item.id === productId);
        
        return item?.quantity || 0;
    }

    const ContextValue: CartContextType = {
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        clearCart,
        quantityOfItem
    } 
    return(
        <CartContext.Provider value= {ContextValue}>
            {children}
        </CartContext.Provider>
    )
} 



