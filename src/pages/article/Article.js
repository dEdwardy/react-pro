/* eslint-disable react/display-name */
import { format, parseISO } from 'date-fns'
import { Table } from 'antd'
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
export function Article (props) {
  const { post } = useFetch('http://localhost:3000')
  // const [pageConfig, setPageConfig] = useState({

  // })
  const [data, setData] = useState({
    list: [],
    total: 0
  })
  const getArticleLsit = async (pageConfig = {}) => {
    const data = await post('/article', pageConfig)
    setData(() => data)
  }
  useEffect(async () => {
    getArticleLsit()
  }, [])
  const handlePageChange = (page, pagesize) => {

  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: '简介',
      dataIndex: 'brief_content',
      key: 'brief_content',
      ellipsis: true
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120
    },
    {
      title: '标签',
      ellipsis: true,
      dataIndex: 'tag',
      key: 'tag',
      render: (text, record, index) => {
        return 'tag'
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: () => {
        return 'state'
      }

    },
    {
      title: '创建日期',
      dataIndex: 'created',
      key: 'created',
      render: (text, record, index) => {
        // utc => paseISO => format
        return format(parseISO(record.created), 'yyyy-MM-dd kk:mm:ss')
      },
      sorter: true
    },
    {
      title: '更新日期',
      dataIndex: 'updated',
      key: 'updated',
      render: (text, record, index) => {
        // utc => paseISO => format
        return format(parseISO(record.updated), 'yyyy-MM-dd kk:mm:ss')
      },
      sorter: true
    },
    {
      title: 'operation',
      width: 250,
      key: 'operation',
      render: () => {
        return 'actions'
      }
    }
  ]
  return (
    <div>
      <Table size="small" columns={columns} dataSource={data.list} pagination={{ total: data.total, onChange: handlePageChange }}/>
    </div>
  )
}
