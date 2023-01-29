import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from 'interfaces';

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
    createOrder: () => Promise<{ hasError: boolean; message: string }>;
}


export const CartContext = createContext({} as CardContextProps);