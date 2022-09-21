import { IApiItemInfo, updateApiItem, createApiItem } from '@/api/apiItem';
import { useAppSelector } from '@/hooks/store';
import { formItemLayout } from '@/utils/common';
import {
  Modal,
  Form,
  Input,
  FormProps,
  Row,
  Space,
  Button,
  message,
  Radio,
  InputNumber,
} from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { IModalType } from '.';

interface IEditModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  type: IModalType;
  data: IApiItemInfo;
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
  const { allDicItems } = useAppSelector((state) => ({
    allDicItems: state.global.allDicItems,
  }));
  const onFinish: FormProps['onFinish'] = async (values) => {
    values.sort = parseInt(values.sort) || 0;
    if (type === 'create') {
      if (data?.id) {
        values.parentId = data.id;
      }
      await createApiItem(values);
      message.success('创建成功');
      createRefresh();
    } else if (type === 'edit') {
      await updateApiItem(values);
      message.success('更新成功');
      updateRefresh();
    }
    handleCancel();
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
        initialValues={{
          needLogin: 1,
          needCheck: 0,
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
        <Form.Item
          label='菜单类型'
          name='type'
          rules={[{ required: true, message: '请输入菜单类型' }]}
        >
          <Radio.Group disabled={isEdit}>
            {allDicItems.API_ITEM_TYPE?.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item dependencies={['type']} noStyle>
          {({ getFieldValue }) => {
            const type = getFieldValue('type');
            if (type === '2') {
              return (
                <Form.Item
                  label='请求路径'
                  name='path'
                  rules={[{ required: true, message: '请输入请求路径' }]}
                >
                  <Input />
                </Form.Item>
              );
            }
            return null;
          }}
        </Form.Item>
        <Form.Item dependencies={['type']} noStyle>
          {({ getFieldValue }) => {
            const type = getFieldValue('type');
            if (type === '2') {
              return (
                <Form.Item
                  label='请求方法'
                  name='method'
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Radio.Group>
                    <Radio value={'get'}>get</Radio>
                    <Radio value={'post'}>post</Radio>
                  </Radio.Group>
                </Form.Item>
              );
            }
            return null;
          }}
        </Form.Item>
        <Form.Item dependencies={['type']} noStyle>
          {({ getFieldValue }) => {
            const type = getFieldValue('type');
            if (type === '2') {
              return (
                <Form.Item
                  label='是否登录'
                  name='needLogin'
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              );
            }
            return null;
          }}
        </Form.Item>
        <Form.Item dependencies={['type', 'needLogin']} noStyle>
          {({ getFieldValue }) => {
            const type = getFieldValue('type');
            const needLogin = getFieldValue('needLogin');
            if (type === '2' && needLogin) {
              return (
                <Form.Item
                  label='是否校验'
                  name='needCheck'
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              );
            }
            return null;
          }}
        </Form.Item>
        <Form.Item dependencies={['type']} noStyle>
          {({ getFieldValue }) => {
            const type = getFieldValue('type');
            if (type === '2') {
              return (
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
              );
            }
            return null;
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
