import { ICartProduct } from 'interfaces';
import { CartState } from './';

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies', payload: ICartProduct[] } 
| { type: '[Cart] - Add Product', payload: ICartProduct[] } 
| { type: '[Cart] - Remove Product', payload: ICartProduct } 
| { type: '[Cart] - Change cart quantity', payload: ICartProduct } 
| { 
        type: '[Cart] - Update order summary', 
        payload: { 
                numberOfItems: number;
                subTotal: number;
                taxRate: number;
                total: number; 
        } 
} 

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

            case '[Cart] - Remove Product':
                return {
                        ...state,
                        cart: state.cart.filter( ( cartProduct ) => !( cartProduct._id === action.payload._id && cartProduct.size === action.payload.size ) )
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
            
                case '[Cart] - Update order summary':
                        return {
                                ...state,
                                ...action.payload
                        }



           default:
            return state;
    }
}