import { Layout, Menu, Breadcrumb, Dropdown } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons'
import { Route, useHistory } from 'react-router-dom'
// import  User  from '../user/User'
// import  Category  from '../category/Category'
// import  Tag  from '../tag/Tag'
// import  Article  from '../article/Article'
// import  Ad  from '../ad/Ad'
import { useState, lazy, Suspense } from 'react'
import './Home.scss'
import { actions } from '../../store/user'
import { useDispatch } from 'react-redux'
// import ArticleDetail from '../article/ArticleDetail'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout
export function Home (props) {
  const User = lazy(() => import('../user/User'))
  const Category = lazy(() => import('../category/Category'))
  const Tag = lazy(() => import('../tag/Tag'))
  const Ad = lazy(() => import('../ad/Ad'))
  const Article = lazy(() => import('../article/Article'))
  const ArticleDetail = lazy(() => import('../article/ArticleDetail'))
  const dispatch = useDispatch()
  const history = useHistory()
  const rootSubmenuKeys = ['1', '2', '3', '4', '5']
  const [openKeys, setOpenKeys] = useState([])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const handleSelect = ({ key }) => {
    // console.error(key,history)
    history.push(key)
  }
  const handleClickMenu = ({ key }) => {
    switch (key) {
      case 'c':
        dispatch(actions.setUserInfo({}))
        history.push('/login')
        break

      default:
        break
    }
    console.error(key)
  }
  const menu = (
    <Menu onClick={handleClickMenu}>
      <Menu.Item key="a">aaaaaaaa</Menu.Item>
      <Menu.Item key="b">bbbbbbb</Menu.Item>
      <Menu.Item key="c">Log out</Menu.Item>
    </Menu>
  )

  return (
    <Layout className="home">
      <Header className="header" style={{ display: 'felx' }}>
        <div className="logo">JJ Manage</div>
        <div className="avatar">
          <Dropdown arrow overlay={menu}>
            <img className="img" src="http://edw4rd.cn/assets/avatar.jpg" />
          </Dropdown>
        </div>
      </Header>
      <Content
        style={{ padding: '0 50px', height: 'calc(100vh - 64px - 70px)' }}
      >
        <Breadcrumb style={{ marginTop: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: '12px 0', height: 'calc(100% - 12px)' }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              onSelect={(e) => handleSelect(e)}
              mode="inline"
              defaultSelectedKeys={[]}
              defaultOpenKeys={[]}
              style={{ height: '100%' }}
            >
              <SubMenu key="1" icon={<UserOutlined />} title="用户管理">
                <Menu.Item key="/user">用户列表</Menu.Item>
              </SubMenu>
              <SubMenu key="2" icon={<LaptopOutlined />} title="文章管理">
                <Menu.Item key="/article">文章列表</Menu.Item>
              </SubMenu>
              <SubMenu key="3" icon={<NotificationOutlined />} title="分类管理">
                <Menu.Item key="/category">分类列表</Menu.Item>
              </SubMenu>
              <SubMenu key="4" icon={<NotificationOutlined />} title="标签管理">
                <Menu.Item key="/tag">标签列表</Menu.Item>
              </SubMenu>
              <SubMenu key="5" icon={<NotificationOutlined />} title="广告管理">
                <Menu.Item key="/ad">广告列表</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              overflow: 'auto scroll',
              height: '100%'
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/user" component={User} />
              <Route path="/category" component={Category} />
              <Route path="/tag" component={Tag} />
              <Route exact path="/article" component={Article} />
              <Route path="/article/:id" component={ArticleDetail} />
              <Route path="/ad" component={Ad} />
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
