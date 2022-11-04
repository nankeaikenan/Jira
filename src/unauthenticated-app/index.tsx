import { useState } from "react";
import {Login} from './login'
import { Register } from "./register"; 

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(true)
    return <div>
        {isRegister ?  <Login/> : <Register/>}
        <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '注册' : '登录'}</button>
    </div>
}