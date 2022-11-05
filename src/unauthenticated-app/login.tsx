import { useAuth, AuthForm } from '../context/auth-context';
import {  Form, Input } from 'antd';
import { LoginButton } from './index';

export const Login = () => {
    const {login} = useAuth()
    const handleSubmit = (values: AuthForm) => {
        login(values)
    };
    return (
    <Form onFinish={handleSubmit} initialValues={{username:'jiracj', password:'jiracj'}}> 
        <Form.Item  name='username'>
            <Input id='username' defaultValue='jiracj' type='text'/>
        </Form.Item>
        <Form.Item name='password'>
            <Input  id='password' defaultValue='jiracj' type='text'/>
        </Form.Item>
        <LoginButton type={"primary"} htmlType={'submit'}>登录</LoginButton>
    </Form>
    );
};