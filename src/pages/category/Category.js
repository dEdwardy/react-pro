/* eslint-disable react/display-name */
import { Table } from 'antd'
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
export function Category (props) {
  const { get } = useFetch('http://localhost:3000')
  const [categoryList, setCategoryList] = useState([])
  useEffect(async () => {
    const { list } = await get('/category/list')
    setCategoryList(() => list)
  }, [])
  const columns = [
    {
      title: '类目',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'operation',
      width: 250,
      key: 'operation',
      render: () => {
        return (
          <div>
            actions
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Table columns={columns} dataSource={categoryList}/>
    </div>
  )
}
