import { Button, Checkbox, Form, Input, FormProps, Row } from 'antd';
import styles from './index.module.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/store';
import { login } from '@/store/global';
import { touristLogin } from '@/api/user';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [search] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish: FormProps['onFinish'] = async (values) => {
    await dispatch(login(values)).unwrap();
    navigate('/');
  };

  useEffect(() => {
    form.setFieldsValue({
      name: search.get('name'),
    });
  }, [form, search]);
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Hi, React-Ts-Admin</h1>
      <Form
        form={form}
        name='login'
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: '请输入用户名', }, { type: 'string', max: 20, min: 1}]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='请输入用户名'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='请输入密码'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={styles.forgot} href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className={styles.loginBtn}>
            登录
          </Button>
          <Row justify='space-between'>
            <span>
              Or <Link to={'/register'}>去注册</Link>
            </span>
            <Button type="link" onClick={() => {
              touristLogin().then(() => {
                navigate('/overview');
              })
            }}>
              游客登录
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
