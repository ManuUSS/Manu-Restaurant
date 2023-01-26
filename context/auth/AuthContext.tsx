import { createContext } from 'react';
import { IUser } from 'interfaces';

export interface AuthProps {
    isLogin: boolean;
    user?: IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
}


export const AuthContext = createContext({} as AuthProps);