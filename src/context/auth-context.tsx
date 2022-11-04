import React, {ReactNode, useContext, useState} from "react";
import * as auth from '../auth-provider'
import {User} from '../pages/todoList/list'
import { useMount } from "../utils";
import { http } from "../utils/http";

interface AuthForm{
    username: string,
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me', {token})
        user = data.user
    }
    return user
}



//const AuthContext = React.createContext({})
const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>
    register: (form: AuthForm) => Promise<void>
    loginout: () => Promise<void>
} | undefined>(undefined)


AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const loginout = () => auth.loginout().then(() => setUser(null))
    
    useMount(() => {
        bootstrapUser().then(setUser)
    })
    return <AuthContext.Provider value={{user, login, register, loginout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}