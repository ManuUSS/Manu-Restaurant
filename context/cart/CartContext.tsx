import { createContext } from 'react';
import { ICartProduct } from 'interfaces';

export interface CardContextProps {
    cart: ICartProduct[];
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeProductFromCart: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as CardContextProps);