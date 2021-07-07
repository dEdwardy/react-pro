/* eslint-disable react/display-name */
import { format, parseISO } from 'date-fns'
import { Table, Button } from 'antd'
import { useState, useEffect } from 'react'
// import useFetch from 'use-http'
import { useSelector } from 'react-redux'
import { getArticle } from '@/api'
import { useHistory } from 'react-router-dom'
export default function Article (props) {
  // const { post } = useFetch('http://localhost:3000')
  // const [pageConfig, setPageConfig] = useState({

  // })
  const history = useHistory()
  const categories = useSelector(state => state?.user?.dict?.category?.map(({ name, id }) => ({ text: name, value: id })) ?? [])
  const tags = useSelector(state => state?.user?.dict?.tag?.map(({ name, id }) => ({ text: name, value: id })) ?? [])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(() => ({
    list: [],
    total: 0
  }))
  const handleClickArticle = id => {
    console.error(id)
    history.push({
      pathname: `/article/${id}`
    })
  }
  const getArticleList = async (pageConfig = {}) => {
    setLoading(true)
    const data = await getArticle(pageConfig)
    setData(data)
    setLoading(false)
  }
  const hanleTableChange = ({ current, pageSize }, filters, sorter) => {
    let options = {}
    const { columnKey, order } = sorter
    const { category, tag } = filters
    if (order)options = { ...options, sortBy: { sortKey: columnKey, sortValue: order === 'ascend' ? 'ASC' : 'DESC' } }
    if (category) options = { ...options, category }
    if (tag)options = { ...options, tag }
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
      width: 100,
      filters: categories,
      filterMultiple: false,
      render: (text, record, index) => {
        return (
          <span>
            { record.category.name }
          </span>
        )
      }
    },
    {
      title: '标签',
      ellipsis: true,
      dataIndex: 'tag',
      key: 'tag',
      filters: tags,
      width: 100,
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
      width: 120,
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
      width: 120,
      key: 'updated',
      render: (text, record, index) => {
        // utc => paseISO => format
        return format(parseISO(record.updated), 'yyyy-MM-dd kk:mm:ss')
      },
      sorter: true
    },
    {
      title: 'operation',
      width: 220,
      key: 'operation',
      render: (text, record, index) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button size="small" onClick={() => handleClickArticle(record.id)}>查看</Button>
          </div>

        )
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
