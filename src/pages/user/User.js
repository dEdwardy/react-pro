/* eslint-disable react/display-name */
import useFetch from 'use-http'
import { Table, Menu, Dropdown } from 'antd'
import { useEffect, useState } from 'react'

export default function User (props) {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'operation',
      width: 280,
      key: 'operation',
      render: (row) => {
        const btns = (
          <Menu onClick={handleActionClick}>
            <Menu.Item key="1">1st item</Menu.Item>
            <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
          </Menu>
        )
        return (
          <>
            <Dropdown.Button overlay={btns}>Actions</Dropdown.Button>
          </>
        )
      }
    }
  ]
  const { get } = useFetch('http://localhost:3000')
  const [userList, setUserList] = useState([])
  const handleActionClick = ({ key }) => {
    console.error(key)
  }
  useEffect(async () => {
    const data = await get('/user')
    setUserList(() => data.list)
  }, [])
  return (
    <div>
      <Table columns={columns} dataSource={userList} pagination={{ showSizeChanger: true }} />
    </div>
  )
}
