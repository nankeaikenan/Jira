import {Input, Select} from 'antd'

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
    <form>
      <div>
        <Input
          type='text'
          value={param.name}
          onChange={e => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        />
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
      </div>
    </form>
  );
};
