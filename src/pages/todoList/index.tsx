import { useState, useEffect } from 'react';
import { List, Project } from './list';
import { Search } from './search';
import { useDebounce, useMount, cleanObject } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled'
import { useAsync } from '../../utils/use-async';

const apiUrl = process.env.REACT_APP_API_URL;
export const TodoList = () => {
  const [param, setParam] = useState({ name: '', personId: '' });
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 2000);

  const client = useHttp()
  const {run, error, isLoading, data: list} = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', {data: cleanObject(debounceParam)}))
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers)
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <Search users={users} param={param} setParam={setParam}></Search>
      <List loading={isLoading} users={users} dataSource={list || []}></List>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: 3.2rem;
`