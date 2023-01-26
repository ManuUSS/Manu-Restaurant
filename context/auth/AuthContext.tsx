import { createContext } from 'react';
import { IUser } from 'interfaces';

export interface AuthProps {
    isLogin: boolean;
    user?: IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
    logoutUser: () => void
}


export const AuthContext = createContext({} as AuthProps);