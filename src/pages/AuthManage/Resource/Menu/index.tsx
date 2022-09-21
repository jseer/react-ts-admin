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
  Tag,
} from 'antd';
import EditModal from './EditModal';
import { formItemLayout, getDicItemLabel } from '@/utils/common';
import { IMenuInfo, getMenuList, removeByIds } from '@/api/menu';
import { useAppSelector } from '@/hooks/store';

export type IModalType = 'create' | 'edit' | 'view';
const MenuList: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>('create');
  const [modalData, setModalData] = useState<IMenuInfo | null>(null);
  const [list, setList] = useState<IMenuInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const { allDicItems } = useAppSelector((state) => ({
    allDicItems: state.global.allDicItems,
  }))

  const showModal = (type: IModalType, data: IMenuInfo | null) => {
    setIsModalOpen(true);
    setModalType(type);
    setModalData(data);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setModalType('create');
    setModalData(null);
  };

 
  const onFinish: FormProps['onFinish'] = () => {
    queryMenuList();
  };

  const queryMenuList = async () => {
    try {
      setLoading(true);
      const data = await getMenuList({
        ...form.getFieldsValue(),
      });
      setList(data);
    } catch(e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    queryMenuList();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
        return getDicItemLabel(allDicItems.MENU_TYPE, text);
      }
    },
    {
      title: '访问路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: number) => {
        const color = ['#f50', 'green'][text];
        const textMap = ['禁用', '启用'];
        return text ? <Tag color={color}>{textMap[text]}</Tag> : '';
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '操作',
      key: 'operator',
      render: (_: any, record: IMenuInfo) => {
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
              onClick={() => {
                showModal('view', record);
              }}
              size="small"
            >
              查看
            </Button>
            <Button
              type='link'
              onClick={() => {
                showModal('create', record);
              }}
              size="small"
              hidden={record.type === '2'}
            >
              添加菜单
            </Button>
          </Space>
        );
      },
    },
  ];

  const removeRoles = async () => {
    await removeByIds({ ids: selectedRowKeys });
    message.success('删除成功');
    queryMenuList();
  };
  return (
    <div>
      <Card bordered={false} style={{ marginBottom: 20 }}>
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <Row>
            <Col span={6}>
              <Form.Item label='名称' name='qp-name-like'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='code' name='qp-code-like'>
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
                    queryMenuList();
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
                showModal('create', null);
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
        updateRefresh={queryMenuList}
        createRefresh={queryMenuList}
        data={modalData}
        type={modalType}
      />
    </div>
  );
};

export default MenuList;
