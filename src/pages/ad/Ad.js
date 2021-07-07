/* eslint-disable react/display-name */
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { getAds } from '@/api'
export default function Ad () {
  const [adList, setAdList] = useState([])
  useEffect(async () => {
    const data = await getAds()
    setAdList(() => data)
  }, [])
  const columns = [
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: 'Banner',
      dataIndex: 'url',
      key: 'url',
      render: (text, row, index) => {
        return (
          // <div>{row.url}</div>
          <img src={ `http://localhost:3000/static/${row.url}`} style={{ width: '60px', height: '60px' }} />
        )
      }
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
      <Table rowKey="id" size="small" columns={columns} dataSource={adList} />
    </div>
  )
}
