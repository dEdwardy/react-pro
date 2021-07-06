import { Form, Input, Button, Checkbox, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import useFetch from 'use-http'
import './Login.scss'
import { types } from '../../store/user'
import { useDispatch } from 'react-redux'
export function Login () {
  const dispatch = useDispatch()
  const { post, loading } = useFetch('http://localhost:3000')
  const onFinish = async (values) => {
    const { remember, ...form } = values
    const data = await post('/auth/login', form)
    if (data) {
      console.error('data', data)
      await dispatch({
        type: types.SET_USER_INFO,
        data
      })
    }
  }
  const onFinishFailed = ({ errorFields: [{ name }] }) => {
    notification.error({
      message: name.includes('username') ? '请输入账号' : '请输入密码',
      duration: 1
    })
  }
  return (
    <div className="login">
      <div className="login-form">
        <div className="title">JJ_Manage</div>
        <div>
          <Form
            requiredMark={false}
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              validateFirst={false}
              name="username"
              rules={[{ required: true, message: '' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              validateFirst={false}
              name="password"
              rules={[{ required: true, message: '' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* Or <a href="">register now!</a> */}
                <Button
                  loading={ loading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
