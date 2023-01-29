import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct, ShippingAddress } from 'interfaces';
import { CartContext, cartReducer } from './';
import { shopApi } from 'api';
import { IOrder } from '../../interfaces/order';


export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number;
    shippingAddress?: ShippingAddress;
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0, 
    subTotal: 0, 
    taxRate: 0, 
    total: 0,
    shippingAddress: undefined 
}

interface Props {
    children: JSX.Element
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( cartReducer, CART_INITIAL_STATE );
   
    useEffect(() => {
        
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [];
            dispatch({ type: '[Cart] - LoadCart from cookies', payload: cookieProducts });
        } catch ( error ) {
            console.log( error );
            dispatch({ type: '[Cart] - LoadCart from cookies', payload: [] });
        }

    }, []);

    useEffect(() => {

        if( Cookie.get( 'firstName' ) ) {
            const shippingAddress = {
                firstName  : Cookie.get('firstName') || '',
                lastName   : Cookie.get('lastName') || '',
                address    : Cookie.get('address') || '',
                address2   : Cookie.get('address2') || '',
                zip        : Cookie.get('zip') || '',
                city       : Cookie.get('city') || '',
                country    : Cookie.get('country') || '',
                phone      : Cookie.get('phone') || '',
            } 
            dispatch({ type: '[Cart] - Load Adress from cookies', payload: shippingAddress });
        }

    }, []);
    

    useEffect(() => {
        
        if (state.cart.length > 0)
            Cookie.set('cart', JSON.stringify( state.cart ));
       
    }, [ state.cart ]);
    

    useEffect(() => {
        
        const numberOfItems =  state.cart.reduce( ( prev, current ) => current.quantity + prev, 0 );
        const subTotal =  state.cart.reduce( ( prev, current ) => ( current.price * current.quantity ) + prev, 0 );
        const taxRate =  Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 ) * subTotal;

        const orderSumm = {
            numberOfItems,
            subTotal,
            taxRate,
            total: subTotal + ( taxRate !== 0 ? taxRate : 1 )
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSumm })

    }, [ state.cart ]);
    

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

    const removeProductFromCart = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove Product', payload: product })
    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const updatedAdress = ( address:ShippingAddress ) => {
        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName );
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address. phone);
        dispatch({ type: '[Cart] - Update adress', payload: address })
    }

    const createOrder = async () => {

        if( state.shippingAddress ) 
        {
            throw new Error('No hay dirección de entrega');
        }

        const body:IOrder = {
            orderItems: state.cart.map( ( product ) => ({
                ...product,
                size: product.size!
            })),
            shippingAddress: state.shippingAddress!,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.taxRate,
            total: state.total,
            isPaid: false
        } 

        try {
            const { data } = await shopApi.post( '/orders', body )
        } catch (error) {
            console.log( error );
        }
    }

    return (
        <CartContext.Provider value={{ ...state, 
            addProductToCart, 
            removeProductFromCart, 
            updateCartQuantity,
            updatedAdress,
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    )
}