import { ICartProduct } from 'interfaces';
import { FC, useReducer } from 'react';
import { CartContext, cartReducer } from './';


export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

interface Props {
    children: JSX.Element
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( cartReducer, CART_INITIAL_STATE );

    const addProductToCart = ( product: ICartProduct ) => {
        
        //Solucion de noobs
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        const productInCart = state.cart.some( p => p._id === product._id );
        
        if( !productInCart ) 
            return dispatch({ type: '[Cart] - Add Product', payload: [...state.cart, product] });

        const productInCartDifferentSize = state.cart.some( p => p.size === product.size && productInCart );

        if( !productInCartDifferentSize ) 
            return dispatch({ type: '[Cart] - Add Product', payload: [...state.cart, product] });
    
        const updatedProducts = state.cart.map( p => {
            if( p._id !== product._id ) return p;
            if( p.size !== product.size ) return p;
            
            p.quantity += product.quantity
            return p;
        });

        dispatch({ type: '[Cart] - Add Product', payload: updatedProducts });

    }

    return (
        <CartContext.Provider value={{ ...state, addProductToCart }}>
            {children}
        </CartContext.Provider>
    )
}