import { createContext } from 'react';
import { ICartProduct } from 'interfaces';
import { ShippingAddress } from '.';

export interface CardContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number;
    shippingAddress?: ShippingAddress,
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeProductFromCart: (product: ICartProduct) => void;
    updatedAdress: (address: ShippingAddress) => void;
}


export const CartContext = createContext({} as CardContextProps);