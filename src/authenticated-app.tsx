// import {List} from './pages/todoList/list'
import { useAuth } from './context/auth-context'
import {TodoList} from './pages/todoList'

export const AuthenticatedApp = () => {
    const {loginout} = useAuth()
    return <div>
        <button onClick={loginout}>登出</button>
        <TodoList/>
    </div>
}