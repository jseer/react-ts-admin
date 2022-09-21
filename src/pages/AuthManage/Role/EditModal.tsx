import { updateRole, createRole } from '@/api/role';
import { IRoleInfo } from '@/store/role';
import { formItemLayout } from '@/utils/common';
import { Modal, Form, Input, FormProps, Row, Space, Button, Radio } from 'antd';
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
    if (type === 'create') {
      await createRole(values);
    } else if (type === 'edit') {
      await updateRole(values);
    }
    handleOk();
  };

  const isView = type === 'view';
  const isEdit = type === 'edit';
  const isCreate = type === 'create';

  useEffect(() => {
    if (isModalOpen) {
      if (isCreate || !data) {
        form.resetFields();
      } else if (data) {
        form.setFieldsValue(data);
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
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='名称'
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
        <Form.Item
          label='状态'
          name='status'
          rules={[{ required: true, message: '请选择' }]}
        >
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
