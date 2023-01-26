import { createContext } from 'react';
import { IUser } from 'interfaces';

export interface AuthProps {
    isLogin: boolean;
    user?: IUser;
}


export const AuthContext = createContext({} as AuthProps);