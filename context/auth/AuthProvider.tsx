import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces/user';


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

    return (
        <AuthContext.Provider value={{ ...state }}>
            {children}
        </AuthContext.Provider>
    )
}