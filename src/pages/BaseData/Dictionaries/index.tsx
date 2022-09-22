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
  message,
  TableColumnProps,
} from 'antd';
import DictionaryModal from './DictionaryModal';
import { formItemLayout, initPageInfo } from '@/utils/common';
import {
  IDictionariesInfo,
  dictionariesPage,
  removeByIds,
  IDictionariesItem,
} from '@/api/dictionaries';
import useModal from '@/hooks/useModal';
import useTable from '@/hooks/useTable';
import Table from '@/components/Table';
import DictionaryItemModal from './DictionaryItemModal';

export type IModalType = 'create' | 'edit' | 'view';
const Dictionaries: React.FC = () => {
  const [form] = Form.useForm();
  const { isModalOpen, modalType, modalData, showModal, hideModal } =
    useModal<IDictionariesInfo>();
  const {
    isModalOpen: isModalOpenItem,
    modalType: modalTypeItem,
    modalData: modalDataItem,
    showModal: showItemModal,
    hideModal: hideItemModal,
  } = useModal<IDictionariesInfo>();
  const {
    selectedRowKeys,
    setSelectedRowKeys,
    total,
    setTotal,
    setLoading,
    loading,
    list,
    setList,
    pageInfo,
    setPageInfo,
  } = useTable<IDictionariesInfo>();

  const onFinish: FormProps['onFinish'] = () => {
    getDictionariesPage();
  };

  const getDictionariesPage = async () => {
    try {
      setLoading(true);
      const data = await dictionariesPage({
        ...form.getFieldsValue(),
        ...pageInfo,
      });
      setList(data.list);
      setTotal(data.total);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDictionariesPage();
  }, [pageInfo]);

  const columns: TableColumnProps<IDictionariesInfo>[] = [
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
      title: '数量',
      dataIndex: 'items',
      key: 'items',
      render: (text: any[]) => {
        return text?.length;
      },
    },
    {
      title: '操作',
      key: 'operator',
      render: (_: any, record: IDictionariesInfo) => {
        return (
          <Space>
            <Button
              type='link'
              onClick={() => {
                showModal('edit', record);
              }}
            >
              编辑
            </Button>
            {/* <Button
              type='link'
              onClick={() => {
                showModal('view', record);
              }}
            >
              查看
            </Button> */}
            <Button
              type='link'
              onClick={() => {
                showItemModal('edit', record);
              }}
            >
              值
            </Button>
          </Space>
        );
      },
    },
  ];

  const removeRoles = async () => {
    if (selectedRowKeys.length) {
      await removeByIds({ ids: selectedRowKeys });
      message.success('删除成功');
      getDictionariesPage();
    } else {
      message.info('请先勾选');
    }
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
              <Form.Item label='code' name='qp-code-eq'>
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
                showModal('create', {} as IDictionariesInfo);
              }}
            >
              添加
            </Button>
            <Button type='primary' danger onClick={removeRoles}>
              删除
            </Button>
          </Space>
        </div>
        <Table<IDictionariesInfo>
          loading={loading}
          list={list}
          columns={columns}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
          total={total}
          setSelectedRowKeys={setSelectedRowKeys}
          selectedRowKeys={selectedRowKeys}
        />
      </Card>
      <DictionaryModal
        isModalOpen={isModalOpen}
        handleCancel={() => {
          hideModal();
        }}
        updateRefresh={getDictionariesPage}
        createRefresh={() => {
          setPageInfo({
            current: 1,
            pageSize: pageInfo.pageSize,
          });
        }}
        data={modalData}
        type={modalType}
      />

      <DictionaryItemModal
        isModalOpen={isModalOpenItem}
        handleCancel={() => {
          hideItemModal();
        }}
        updateRefresh={getDictionariesPage}
        data={modalDataItem}
        type={modalTypeItem}
      />
    </div>
  );
};

export default Dictionaries;
