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
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import EditModal from './EditModal';
import {
  formItemLayout,
  getDicItemLabel,
  getListItem,
  initPageInfo,
} from '@/utils/common';
import { IRoleInfo, rolePageThunk } from '@/store/role';
import { removeByIds } from '@/api/role';
import useModal from '@/hooks/useModal';
import UserModal from './UserModal';
import ResourceModal from './ResourceModal';

export type IModalType = 'create' | 'edit' | 'view';
const RoleList: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>('create');
  const [modalData, setModalData] = useState<IRoleInfo | null>(null);
  const { list, listLoading } = useAppSelector((state) => {
    const { roleList, listLoading } = state.role;
    return {
      list: roleList,
      listLoading,
    };
  });
  const {
    isModalOpen: isUserModalOpen,
    modalData: userModalData,
    showModal: showUserModal,
    hideModal: hideUserModal,
  } = useModal<IRoleInfo>();

  const {
    isModalOpen: isResourceModalOpen,
    modalData: resourceModalData,
    showModal: showResourceModal,
    hideModal: hideResourceModal,
  } = useModal<IRoleInfo>();

  const showModal = (type: IModalType, data: IRoleInfo | null) => {
    setIsModalOpen(true);
    setModalType(type);
    setModalData(data);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setModalType('create');
    setModalData(null);
  };

  const [pageInfo, setPageInfo] = useState(initPageInfo);
  const [total, setTotal] = useState(0);
  const onFinish: FormProps['onFinish'] = () => {
    getRolePage();
  };

  const getRolePage = async () => {
    const data = await dispatch(
      rolePageThunk({
        ...form.getFieldsValue(),
        ...pageInfo,
      })
    ).unwrap();
    setTotal(data.total);
  };
  useEffect(() => {
    getRolePage();
  }, [pageInfo]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '??????',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '??????',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '??????',
      dataIndex: 'status',
      key: 'status',
      render: (text: number) => {
        const color = ['red', 'green'][text];
        const textMap = ['??????', '??????'];
        return text == undefined ? (
          ''
        ) : (
          <Tag color={color}>{textMap[text]}</Tag>
        );
      },
    },
    {
      title: '??????',
      key: 'operator',
      render: (_: any, record: IRoleInfo) => {
        return (
          <Space>
            <Button
              type='link'
              onClick={() => {
                showModal('edit', record);
              }}
              size='small'
            >
              ??????
            </Button>
            <Button
              type='link'
              onClick={() => {
                showModal('view', record);
              }}
              size='small'
            >
              ??????
            </Button>
            <Button
              type='link'
              onClick={() => {
                showUserModal('edit', record);
              }}
              size='small'
            >
              ????????????
            </Button>
            <Button
              type='link'
              onClick={() => {
                showResourceModal('edit', record);
              }}
              size='small'
            >
              ????????????
            </Button>
          </Space>
        );
      },
    },
  ];

  const removeRoles = async () => {
    if (selectedRowKeys.length) {
      await removeByIds({ ids: selectedRowKeys });
      message.success('????????????');
      getRolePage();
    } else {
      message.info('????????????');
    }
  };
  return (
    <div>
      <Card bordered={false} style={{ marginBottom: 20 }}>
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <Row>
            <Col span={6}>
              <Form.Item label='??????' name='qp-name-like'>
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
                  ??????
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setPageInfo({ ...initPageInfo });
                  }}
                >
                  ??????
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
              ??????
            </Button>
            <Button type='primary' danger onClick={removeRoles}>
              ??????
            </Button>
          </Space>
        </div>
        <Table
          loading={listLoading}
          dataSource={list}
          columns={columns}
          onChange={(pagination) => {
            setPageInfo({
              current: pagination.current || 1,
              pageSize: pagination.pageSize || 10,
            });
          }}
          pagination={{
            pageSize: pageInfo.pageSize,
            current: pageInfo.current,
            total,
          }}
          rowKey='id'
          rowSelection={{
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
        handleOk={() => {
          if (modalType === 'create') {
            message.success('????????????');
            setPageInfo({
              current: 1,
              pageSize: pageInfo.pageSize,
            });
          } else if (modalType === 'edit') {
            message.success('????????????');
            getRolePage();
          }
          hideModal();
        }}
        data={modalData}
        type={modalType}
      />

      <UserModal
        isModalOpen={isUserModalOpen}
        handleCancel={() => {
          hideUserModal();
        }}
        data={userModalData}
      />
      <ResourceModal
        isModalOpen={isResourceModalOpen}
        handleCancel={() => {
          hideResourceModal();
        }}
        data={resourceModalData}
      />
    </div>
  );
};

export default RoleList;
