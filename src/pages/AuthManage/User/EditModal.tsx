import { userCreate, userUpdate } from '@/api/user';
import { IRoleInfo } from '@/store/role';
import { IUserInfo } from '@/store/user';
import { formItemLayout } from '@/utils/common';
import {
  Modal,
  Form,
  Input,
  FormProps,
  Row,
  Space,
  Button,
  Select,
  Radio,
} from 'antd';
import { useEffect } from 'react';
import { IModalType } from '.';
import SelectRole from './SelectRole';

interface IEditModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  type: IModalType;
  data: IUserInfo | null;
  roleList: IRoleInfo[];
}
const EditModal: React.FC<IEditModalProps> = (props) => {
  const { isModalOpen, handleOk, handleCancel, type, data, roleList } = props;
  const [form] = Form.useForm();
  const onFinish: FormProps['onFinish'] = async (values) => {
    if (type === 'create') {
      await userCreate(values);
    } else if (type === 'edit') {
      await userUpdate(values);
    }
    handleOk();
  };

  const isView = type === 'view';
  const isEdit = type === 'edit';
  const isCreate = type === 'create';

  useEffect(() => {
    if (isModalOpen) {
      if(isCreate || !data) {
        form.resetFields();
      } else if(data){
        form.setFieldsValue({
          ...data,
          roles: data.roles?.map((role) => role.code),
        });
      }
    }
  }, [isModalOpen, data]);
  return (
    <Modal
      title={isView ? '查看' : isEdit ? '编辑' : '创建'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <Row justify='end'>
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            {isView ? null : (
              <Button type='primary' onClick={form.submit}>
                确定
              </Button>
            )}
          </Space>
        </Row>
      }
    >
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        disabled={isView}
        autoComplete="off"
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='账号'
          name='name'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
          rules={[
            {
              type: 'email',
              message: '请输入正确的邮箱',
            },
            {
              required: true,
              message: '请输入邮箱',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>
        <Form.Item
          name='gender'
          label='性别'
          rules={[{ required: true, message: '请输入性别' }]}
        >
          <Radio.Group>
            <Radio value={'1'}>男</Radio>
            <Radio value={'2'}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='角色' name='roles'>
          <SelectRole roleList={roleList} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
