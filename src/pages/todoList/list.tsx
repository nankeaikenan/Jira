
import {Table} from 'antd'
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string
}
interface Iprops {
  list: Project[];
  users: User[];
}



export const List = ({ list, users }: Iprops) => {
  return (
    <Table pagination={false} columns={[{
      title:'名称',
      dataIndex:'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
      },{
        title:'负责人',
        render(value, project){
         return <span>
            {users.find(user => user.id === project.personId)?.name || '未知'}
         </span>
        }
      }]} dataSource={list}>
    </Table>
  );
};
