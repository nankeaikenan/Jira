import dayjs from 'dayjs'
import {Table, TableProps} from 'antd'

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number
}
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string
}
interface Iprops extends TableProps<Project>{
  users: User[];
}

export const List = ({ users, ...props }: Iprops) => {
  return (
    <Table 
      pagination={false} 
      columns={[{
      title:'名称',
      dataIndex:'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: '部门 ',
        dataIndex: 'organization',
      },
      {
        title:'负责人',
        render(value, project){
         return <span>
            {users.find(user => user.id === project.personId)?.name || '未知'}
         </span>
        }
      },{
        title: '创建时间',
        render( value, project ) {
          return (
            <span>
              { project.created
                ? dayjs( project.created ).format( 'YYYY-MM-DD' )
                : '无' }
            </span>
          )
        },
      },]} 
      {...props}>
    </Table>
  );
};
