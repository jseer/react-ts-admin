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
  Tooltip,
} from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { IUserInfo, userPageThunk } from '@/store/user';
import EditModal from './EditModal';
import { formItemLayout, getDicItemLabel, initPageInfo } from '@/utils/common';
import { removeByIds } from '@/api/user';
import { getRoleList } from '@/api/role';
import { IRoleInfo } from '@/store/role';
import SelectRole from './SelectRole';

export type IModalType = 'create' | 'edit' | 'view';
const UserList: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>('create');
  const [modalData, setModalData] = useState<IUserInfo | null>(null);
  const [roleList, setRoleList] = useState<IRoleInfo[]>([]);
  const { list, listLoading } = useAppSelector((state) => {
    const { userList, listLoading } = state.user;
    return {
      list: userList,
      listLoading,
    };
  });
  const showModal = (type: IModalType, data: IUserInfo | null) => {
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
    getUserPage();
  };

  const getUserPage = async () => {
    const formValues = form.getFieldsValue();
    const roles = formValues.roles?.join(',');
    const data = await dispatch(
      userPageThunk({
        ...form.getFieldsValue(),
        roles,
        ...pageInfo,
      })
    ).unwrap();
    setTotal(data.total);
  };
  useEffect(() => {
    getUserPage();
  }, [pageInfo]);

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
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      ellipsis: true,
      render: (_: any, record: IUserInfo) => {
        const roleStr = record.roles?.map((item) => item.name).join(',');
        return roleStr ? (
          <Tooltip title={roleStr}>
            <span>{roleStr}</span>
          </Tooltip>
        ) : null;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (text: number) => {
        return text === 1 ? '男' : text === 2 ? '女' : '';
      }
    },
    {
      title: '操作',
      key: 'operator',
      render: (_: any, record: IUserInfo) => {
        return (
          <Space>
            <Button
              type='link'
              onClick={() => {
                showModal('edit', record);
              }}
              size="small"
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
          </Space>
        );
      },
    },
  ];

  const removeUsers = async () => {
    await removeByIds({ ids: selectedRowKeys });
    message.success('删除成功');
    getUserPage();
  };

  useEffect(() => {
    getRoleList().then((data) => {
      setRoleList(data);
    });
  }, []);
  return (
    <div>
      <Card bordered={false} style={{ marginBottom: 20 }}>
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <Row>
            <Col span={6}>
              <Form.Item label='角色' name='qp-roles-in'>
                <SelectRole roleList={roleList} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='账号' name='qp-name-like'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='邮箱' name='qp-email-like'>
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
                    setPageInfo({ ...initPageInfo });
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
            <Button type='primary' danger onClick={removeUsers}>
              删除
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
        roleList={roleList}
        handleOk={() => {
          if (modalType === 'create') {
            message.success('创建成功');
            setPageInfo({
              current: 1,
              pageSize: pageInfo.pageSize,
            });
          } else if (modalType === 'edit') {
            message.success('更新成功');
            getUserPage();
          }
          hideModal();
        }}
        data={modalData}
        type={modalType}
      />
    </div>
  );
};

export default UserList;
