import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from 'interfaces';
import { CartContext, cartReducer } from './';


export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number;
    shippingAdress?: ShippingAdress;
}

export interface ShippingAdress {
    firstName : string;
    lastName  : string;
    address   : string;
    address2? : string;
    zip       : string;
    city      : string;
    country   : string;
    phone     : string;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0, 
    subTotal: 0, 
    taxRate: 0, 
    total: 0,
    shippingAdress: undefined 
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
            const addressObj: ShippingAdress = {
                firstName  : Cookie.get( 'firstName' ) || '',
                lastName   : Cookie.get( 'lastName' ) || '',
                address    : Cookie.get( 'address' ) || '',
                address2   : Cookie.get( 'address2' ) || '',
                zip        : Cookie.get( 'zip' ) || '',
                city       : Cookie.get( 'city' ) || '',
                country    : Cookie.get( 'country' ) || '',
                phone      : Cookie.get( 'phone' ) || '',
            } 
            dispatch({ type: '[Cart] - Load Adress from cookies', payload: addressObj });
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


    return (
        <CartContext.Provider value={{ ...state, 
            addProductToCart, 
            removeProductFromCart, 
            updateCartQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}