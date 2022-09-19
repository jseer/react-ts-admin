import {
  updateDictionaries,
  createDictionaries,
  IDictionariesInfo,
} from '@/api/dictionaries';
import { Form, Input, message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { IModalType } from '.';
import Modal from '@/components/Modal';

interface IEditModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  type: IModalType;
  data: IDictionariesInfo | null;
  createRefresh: () => void;
  updateRefresh: () => void;
}
const EditModal: React.FC<IEditModalProps> = (props) => {
  const {
    isModalOpen,
    handleCancel,
    type,
    data,
    createRefresh,
    updateRefresh,
  } = props;
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      if (type === 'create') {
        await createDictionaries(values);
        message.success('创建成功');
        createRefresh();
      } else if (type === 'edit') {
        await updateDictionaries(values);
        message.success('更新成功');
        updateRefresh();
      }
      handleCancel();
    });
  };

  useEffect(() => {
    if (type === 'create' || !isModalOpen) {
      form.resetFields();
    } else {
      form.setFieldsValue(data);
    }
  }, [isModalOpen, data]);

  return (
    <Modal
      type={type}
      isModalOpen={isModalOpen}
      handleCancel={handleCancel}
      handleOk={handleOk}
    >
      <Form
        form={form}
        disabled={type === 'view'}
        initialValues={{
          list: [{ label: '', value: '' }],
        }}
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='名称'
          name='name'
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='code'
          name='code'
          rules={[{ required: true, message: '请输入code' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
