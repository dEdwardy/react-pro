import { Form, Input, Button, Checkbox, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useFetch from 'use-http'
import { actions } from '../../store/user'

import './Login.scss'

export function Login () {
  const history = useHistory()
  const token = useSelector(state => state?.user?.uinfo?.token)
  if (token)history.push('/')
  const dispatch = useDispatch()
  const { post } = useFetch('http://localhost:3000')
  const onFinish = async (values) => {
    console.log('Success:', values)
    const { remember, ...form } = values
    const data = await post('/auth/login', form)
    if (data) {
      dispatch(actions.setUserInfo(data))
      notification.success({
        message: '登录成功'
      })
      history.push('/')
      console.error('data', data)
    }
  }
  const onFinishFailed = ({ errorFields: [{ name }] }) => {
    if (name.includes('username')) {
      notification.error({
        message: '请输入账号'
      })
    } else {
      notification.error({
        message: '请输入密码'
      })
    }
  }
  return (
    <div className="login">
      <div className="login-form">
        <h3>JJ_Manage</h3>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            requiredMark={false}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label=""
              name="username"
              rules={[{ required: true, message: '' }]}
            >
              <Input style={{ width: '240px' }} placeholder="账号" />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              rules={[{ required: true, message: '' }]}
            >
              <Input.Password style={{ width: '240px' }} placeholder="密码" />
            </Form.Item>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '240px',
                padding: '4px 0 12px 0'
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </div>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
