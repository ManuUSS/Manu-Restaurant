import { createContext } from 'react';
import { ICartProduct } from 'interfaces';

export interface CardContextProps {
    cart: ICartProduct[];
}


export const CartContext = createContext({} as CardContextProps);