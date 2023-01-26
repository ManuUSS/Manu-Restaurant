import { createContext } from 'react';
import { ICartProduct } from 'interfaces';
import { ShippingAdress } from '.';

export interface CardContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number;
    shippingAddres?: ShippingAdress,
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeProductFromCart: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as CardContextProps);