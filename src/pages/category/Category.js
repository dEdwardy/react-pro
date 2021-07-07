/* eslint-disable react/display-name */
import { Table } from 'antd'
import { useState, useEffect } from 'react'
import { getCategoryList } from '@/api'
export default function Category (props) {
  const [categoryList, setCategoryList] = useState([])
  useEffect(async () => {
    const { list } = await getCategoryList()
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
      <Table rowKey="id" columns={columns} dataSource={categoryList}/>
    </div>
  )
}
