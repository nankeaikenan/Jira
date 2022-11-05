import { useState, useEffect } from 'react';
import { List } from './list';
import { Search } from './search';
import { useDebounce, useMount, cleanObject } from '../../utils';
import { useHttp } from '../../utils/http';

const apiUrl = process.env.REACT_APP_API_URL;
export const TodoList = () => {
  const [param, setParam] = useState({ name: '', personId: '' });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 2000);

  const client = useHttp()

  useEffect(() => {
    client('projects', {data: cleanObject(debounceParam)}).then((res) => {
      setList(res);
    })
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers)
  });
  return (
    <>
      <Search users={users} param={param} setParam={setParam}></Search>
      <List users={users} list={list}></List>
    </>
  );
};
