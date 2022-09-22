import { Button, Form, Input, FormProps, Radio, Space } from "antd";
import styles from "./index.module.less";
import { formItemLayout } from "@/utils/common";
import { useNavigate } from 'react-router-dom';
import { userRegisterThunk } from '@/store/user';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useEffect } from 'react';

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Register: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => ({
    userInfo: state.global.userInfo,
  }));
  const onFinish: FormProps["onFinish"] = async (values) => {
    await dispatch(userRegisterThunk(values)).unwrap();
    navigate('/login?name='+ values.name);
  };

  useEffect(() => {
    if(userInfo) {
      navigate('/overview');
    }
  }, [userInfo]);

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>注册</h1>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        {...formItemLayout}
        scrollToFirstError
        className={styles.form}
      >
        <Form.Item
          name="name"
          label="账号"
          rules={[{ required: true, message: "请输入账号", whitespace: true }, { type: 'string', max: 20, min: 1}]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: "email",
              message: "请输入正确的邮箱",
            },
            {
              required: true,
              message: "请输入邮箱",
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请确认密码",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不匹配"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="gender"
          label="性别"
          rules={[{ required: true, message: "请输入性别" }]}
        >
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Space>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button onClick={() => navigate('/login')}>返回登录</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
