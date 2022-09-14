import { updateRole, createRole } from '@/api/role';
import { IRoleInfo } from '@/store/role';
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

interface IEditModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  type: IModalType;
  data: IRoleInfo | null;
}
const EditModal: React.FC<IEditModalProps> = (props) => {
  const { isModalOpen, handleOk, handleCancel, type, data } = props;
  const [form] = Form.useForm();
  const onFinish: FormProps['onFinish'] = async (values) => {
    if(type === 'create') {
      await createRole(values);
    } else if(type === 'edit') {
      await updateRole(values);
    }
    handleOk();
  };

  useEffect(() => {
    if (isModalOpen && data) {
      form.setFieldsValue(data);
    }
  }, [isModalOpen, data]);
  const isView = type === 'view';
  return (
    <Modal
      title='编辑'
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
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='账号'
          name='name'
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='code'
          name='code'
          rules={[{ required: true, message: '请输入角色code' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
