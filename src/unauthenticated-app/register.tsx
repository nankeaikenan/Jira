import { useAuth, AuthForm } from '../context/auth-context';
import { Button, Form, Input } from 'antd';
import { LoginButton } from './index';

export const Register = () => {
    const {register, user} = useAuth()
    const handleSubmit = (values: AuthForm) => {
        register(values)
    };
    return (
    <Form onFinish={handleSubmit}> 
        <Form.Item  name='username' rules={[{ required: false, message: '请输入用户名' }]}>
            <Input placeholder="用户名" id='username' defaultValue='jiracj' type='text'/>
        </Form.Item>
        <Form.Item name='password' rules={[{ required: false, message: '请输入密码' }]}>
            <Input placeholder="密码" id='password' defaultValue='jiracj' type='text'/>
        </Form.Item>
        <LoginButton type={"primary"} htmlType={'submit'}>注册</LoginButton>
    </Form>
    );
};
