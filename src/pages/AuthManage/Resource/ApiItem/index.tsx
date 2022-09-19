import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Button,
  Space,
  FormProps,
  Table,
  message,
} from 'antd';
import EditModal from './EditModal';
import { formItemLayout, getDicItemLabel } from '@/utils/common';
import { IApiItemInfo, getApiItemList, removeByIds } from '@/api/apiItem';
import { useAppSelector } from '@/hooks/store';

export type IModalType = 'create' | 'edit' | 'view';
const ApiItemList: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>('create');
  const [modalData, setModalData] = useState<IApiItemInfo>({} as IApiItemInfo);
  const [list, setList] = useState<IApiItemInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const { allDicItems } = useAppSelector((state) => ({
    allDicItems: state.global.allDicItems,
  }))

  const showModal = (type: IModalType, data: IApiItemInfo) => {
    setIsModalOpen(true);
    setModalType(type);
    setModalData(data);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setModalType('create');
    setModalData({} as IApiItemInfo);
  };

 
  const onFinish: FormProps['onFinish'] = () => {
    queryApiItemList();
  };

  const queryApiItemList = async () => {
    try {
      setLoading(true);
      const data = await getApiItemList({
        ...form.getFieldsValue(),
      });
      setList(data);
    } catch(e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    queryApiItemList();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '菜单类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        return getDicItemLabel(allDicItems.API_ITEM_TYPE, text);
      }
    },
    {
      title: '访问路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '操作',
      key: 'operator',
      render: (_: any, record: IApiItemInfo) => {
        return (
          <Space>
            <Button
              type='link'
              size="small"
              onClick={() => {
                showModal('edit', record);
              }}
            >
              编辑
            </Button>
            <Button
              type='link'
              size="small"
              onClick={() => {
                showModal('view', record);
              }}
            >
              查看
            </Button>
            <Button
              type='link'
              size="small"
              onClick={() => {
                showModal('create', record);
              }}
              hidden={record.type === '2'}
            >
              添加接口
            </Button>
          </Space>
        );
      },
    },
  ];

  const removeRoles = async () => {
    await removeByIds({ ids: selectedRowKeys });
    message.success('删除成功');
    queryApiItemList();
  };
  return (
    <div>
      <Card bordered={false} style={{ marginBottom: 20 }}>
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <Row>
            <Col span={6}>
              <Form.Item label='名称' name='name'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='code' name='code'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Space>
                <Button type='primary' htmlType='submit'>
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    queryApiItemList();
                  }}
                >
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card bordered={false}>
        <div style={{ marginBottom: 10 }}>
          <Space>
            <Button
              type='primary'
              onClick={() => {
                showModal('create', {} as IApiItemInfo);
              }}
            >
              添加
            </Button>
            <Button type='primary' danger onClick={removeRoles}>
              删除
            </Button>
          </Space>
        </div>
        <Table
          loading={loading}
          dataSource={list}
          columns={columns}
          rowKey='id'
          rowSelection={{
            checkStrictly: false,
            selectedRowKeys,
            onChange: (selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys);
            },
          }}
        />
      </Card>
      <EditModal
        isModalOpen={isModalOpen}
        handleCancel={() => {
          hideModal();
        }}
        updateRefresh={queryApiItemList}
        createRefresh={queryApiItemList}
        data={modalData}
        type={modalType}
      />
    </div>
  );
};

export default ApiItemList;
