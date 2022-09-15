import {
  getDictionariesItemsById,
  IDictionariesInfo,
  IDictionariesItem,
  updateDictionariesItems,
} from '@/api/dictionaries';
import {
  Form,
  Input,
  Space,
  Button,
  message,
  Select,
  InputNumber,
  Row,
  Col,
} from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { IModalType } from '.';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';

const { Option } = Select;
interface IEditModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  type: IModalType;
  data: IDictionariesInfo | null;
  updateRefresh: () => void;
}
const DictionaryItemModal: React.FC<IEditModalProps> = (props) => {
  const { isModalOpen, handleCancel, type, data, updateRefresh } = props;
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      if (type === 'edit' && data) {
        await updateDictionariesItems(data.id!, values.list);
        message.success('更新成功');
        updateRefresh();
      }
      handleCancel();
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      if (data) {
        getDictionariesItemsById(data.id!).then((data) => {
          form.setFieldsValue({
            list: data,
          });
        });
      }
    } else {
      form.resetFields();
    }
  }, [isModalOpen, data?.id]);

  return (
    <Modal
      type={type}
      isModalOpen={isModalOpen}
      handleCancel={handleCancel}
      handleOk={handleOk}
      width={600}
    >
      <Form form={form} disabled={type === 'view'}>
        <Form.List name='list'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} justify='space-between' gutter={10}>
                  <Form.Item name='id' hidden>
                    <Input />
                  </Form.Item>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      label='label'
                      name={[name, 'label']}
                      rules={[{ required: true, message: '请输入label' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      label='value'
                      name={[name, 'value']}
                      rules={[{ required: true, message: '请输入value' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={2}>
                    <MinusCircleOutlined
                      style={{
                        color: '#3e4491',
                        fontSize: 18,
                        lineHeight: '32px',
                      }}
                      onClick={() => remove(name)}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  style={{ width: '100%' }}
                  type='dashed'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加值
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default DictionaryItemModal;
