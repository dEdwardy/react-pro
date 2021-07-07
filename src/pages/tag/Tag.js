/* eslint-disable react/display-name */
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import useFetch from 'use-http'
export default function Tag () {
  const [tagList, setTagList] = useState([])
  const { get } = useFetch('http://localhost:3000')
  useEffect(async () => {
    const { list } = await get('/tag/list')
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
      <Table size="small" columns={columns} dataSource={tagList} />
    </div>
  )
}
