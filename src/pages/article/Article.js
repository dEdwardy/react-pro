/* eslint-disable react/display-name */
import { format, parseISO } from 'date-fns'
import { Table } from 'antd'
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
export function Article (props) {
  const { post } = useFetch('http://localhost:3000')
  // const [pageConfig, setPageConfig] = useState({

  // })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(() => ({
    list: [],
    total: 0
  }))
  const getArticleList = async (pageConfig = {}) => {
    setLoading(true)
    const data = await post('/article', pageConfig)
    setData(data)
    setLoading(false)
  }
  const hanleTableChange = ({ current, pageSize }, filters, sorter) => {
    let options = {}
    const { columnKey, order } = sorter
    const { category } = filters
    if (order)options = { ...options, sortBy: { sortKey: columnKey, sortValue: order === 'ascend' ? 'ASC' : 'DESC' } }
    if (category) options = { ...options, category }
    getArticleList({
      ...options,
      page: current,
      limit: pageSize
    })
  }
  useEffect(async () => {
    getArticleList()
  }, [])

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
        return (
          record.tag.map(i => {
            return (<span key={i.id}> {i.name} </span>)
          })
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record, index) => {
        return record.state
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
      <Table
        loading={loading}
        size="small"
        columns={columns}
        dataSource={data.list}
        onChange= {hanleTableChange}
        pagination={{ total: data.total }}
      />
    </div>
  )
}
