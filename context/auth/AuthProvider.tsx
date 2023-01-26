import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces/user';
import { shopApi } from 'api';
import Cookie from 'js-cookie';
import axios from 'axios';


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

    const registerUser = async ( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {

        try {
            const { data } = await shopApi.post( 'user/register', { email, password });
            const { token, user } = data;
            Cookie.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user })
            return {
                hasError: false
            };
        } catch ( error ) {
            if( axios.isAxiosError( error ) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario, intente de nuevo'
            }

        }

    } 

    return (
        <AuthContext.Provider value={{ ...state, loginUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    )
}