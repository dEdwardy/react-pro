/* eslint-disable react/display-name */
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { getTagList } from '@/api'
export default function Tag () {
  const [tagList, setTagList] = useState([])
  useEffect(async () => {
    const { list } = await getTagList()
    setTagList(() => list)
  }, [])
  const columns = [
    {
      title: '标签',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'operation',
      width: 250,
      key: 'operation',
      render: () => {
        return (
          <div>actions</div>
        )
      }
    }
  ]
  return (
    <div className="tag">
      <Table rowKey="id" size="small" columns={columns} dataSource={tagList} pagination={{ showSizeChanger: true }} />
    </div>
  )
}
