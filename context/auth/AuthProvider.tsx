import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces/user';
import { shopApi } from 'api';
import Cookie from 'js-cookie';


export interface AuthState {
    isLogin: boolean;
    user?: IUser;

}

const AUTH_INITIAL_STATE: AuthState = {
    isLogin: false,
    user: undefined,
}

interface Props {
    children: JSX.Element
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );

    const loginUser = async ( email:string, password:string ): Promise<boolean> => {
        try {
            
            const { data } = await shopApi.post( 'user/login', { email, password });
            const { token, user } = data;
            Cookie.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user })
            return true;
        } catch ( error ) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ ...state, loginUser }}>
            {children}
        </AuthContext.Provider>
    )
}