import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from 'interfaces';
import { CartContext, cartReducer } from './';


export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number; 
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0, 
    subTotal: 0, 
    taxRate: 0, 
    total: 0 
}

interface Props {
    children: JSX.Element
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( cartReducer, CART_INITIAL_STATE );

    useEffect(() => {
        
        Cookie.set('cart', JSON.stringify( state.cart ));

    }, [ state.cart ]);

    useEffect(() => {

        try {
            const cookiesCart =  Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [];
            dispatch({ type: '[Cart] - LoadCart from cookies', payload: cookiesCart });
        } catch ( error ) {
            dispatch({ type: '[Cart] - LoadCart from cookies', payload: [] });
        }

    }, []);

    

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