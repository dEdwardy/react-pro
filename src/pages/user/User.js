/* eslint-disable react/display-name */
import { Table, Menu, Dropdown } from 'antd'
import { useEffect, useState } from 'react'
import { getUsers } from '@/api'

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
            <Menu.Item key="11">1st item</Menu.Item>
            <Menu.Item key="22">2nd item</Menu.Item>
            <Menu.Item key="33">3rd item</Menu.Item>
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
  const [userList, setUserList] = useState([])
  const handleActionClick = ({ key }) => {
    console.error(key)
  }
  useEffect(async () => {
    const data = await getUsers()
    setUserList(data.list)
  }, [])
  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={userList} pagination={{ showSizeChanger: true }} />
    </div>
  )
}
