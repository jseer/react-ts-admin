import { Button, Checkbox, Form, Input, FormProps, Row } from 'antd';
import styles from './index.module.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { login } from '@/store/global';
import { getPublicKey, touristLogin } from '@/api/user';
import JSEncrypt from 'jsencrypt';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => ({
    userInfo: state.global.userInfo,
  }));
  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      setLoading(true);
      const { publicKey } = await getPublicKey();
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      values.password = encrypt.encrypt(values.password);
      await dispatch(login(values)).unwrap();
      navigate('/overview');
    } catch(e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: search.get('name'),
    });
  }, [form, search]);

  useEffect(() => {
    if(userInfo) {
      navigate('/overview');
    }
  }, [userInfo]);
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Hi, React-Ts-Admin</h1>
      <Form
        form={form}
        name='login'
        className={styles.form}
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: '请输入用户名', }, { type: 'string', max: 20, min: 1}]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='管理员账号: admin'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='管理员密码: admin'
          />
        </Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>今天内记住你</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} className={styles.loginBtn}>
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
