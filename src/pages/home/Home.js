import { Layout, Menu, Breadcrumb } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons'
import { Route, useHistory, BrowserRouter as Router } from 'react-router-dom'
import { User } from '../user/User'
import { Category } from '../category/Category'
import { Tag } from '../tag/Tag'
import { Article } from '../article/Article'
import { Ad } from '../ad/Ad'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout
export function Home (props) {
  const history = useHistory()
  const handleSelect = ({ key }) => {
    // console.error(key,history)
    history.push(key)
  }
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{ padding: '0 50px', height: 'calc(100vh - 64px - 70px)' }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0', height: '100%' }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                onSelect={(e) => handleSelect(e)}
                mode="inline"
                defaultSelectedKeys={[]}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="1" icon={<UserOutlined />} title="用户管理">
                  <Menu.Item key="/user">用户列表</Menu.Item>
                </SubMenu>
                <SubMenu key="2" icon={<LaptopOutlined />} title="文章管理">
                  <Menu.Item key="/article">文章列表</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="3"
                  icon={<NotificationOutlined />}
                  title="分类管理"
                >
                  <Menu.Item key="/category">分类列表</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="4"
                  icon={<NotificationOutlined />}
                  title="标签管理"
                >
                  <Menu.Item key="/tag">标签列表</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="5"
                  icon={<NotificationOutlined />}
                  title="广告管理"
                >
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
              <Route path="/user" component={User} />
              <Route path="/category" component={Category} />
              <Route path="/tag" component={Tag} />
              <Route path="/article" component={Article} />
              <Route path="/ad" component={Ad} />
            </Content>
          </Layout>
        </Content>
        <Footer className="login" style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  )
}
