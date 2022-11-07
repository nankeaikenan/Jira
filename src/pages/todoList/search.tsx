import {Input, Select, Form} from 'antd'

interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface Iprops {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: Iprops['param']) => void;
}
export const Search = ({ users, param, setParam }: Iprops) => {
  return (
    <Form style={ { marginBottom: '2rem' } } layout={ 'inline' }>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type='text'
          value={param.name}
          onChange={e => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
            value={param.personId}
            onChange={value => {
              setParam({
                ...param,
                personId: value,
              });
            }}
          >
            <Select.Option value=''>负责人</Select.Option>
            {users.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
      </Form.Item>
    </Form>
  );
};
