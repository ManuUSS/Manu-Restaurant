import { ICartProduct } from 'interfaces';
import { CartState } from './';

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies', payload: ICartProduct[] } 
| { type: '[Cart] - Add Product', payload: ICartProduct[] } 
| { type: '[Cart] - Change cart quantity', payload: ICartProduct } 

export const cartReducer = ( state: CartState, action:CartActionType ): CartState => {
     switch ( action.type ) {
          case '[Cart] - LoadCart from cookies':   
            return {
                ...state,
                cart: [ ...action.payload ]
            }

            case '[Cart] - Add Product':
                return {
                        ...state,
                        cart: [ ...action.payload ]
                }

            case '[Cart] - Change cart quantity':
                return {
                        ...state,
                        cart: state.cart.map( ( cartProduct ) => {
                                if( cartProduct._id !== action.payload._id ) return cartProduct;
                                if( cartProduct.size !== action.payload.size ) return cartProduct;
                                return action.payload;
                        })
                }

           default:
            return state;
    }
}