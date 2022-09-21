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
} from 'antd';
import { getTouristPage, ITouristInfo } from '@/api/tourist';
import { formItemLayout, initPageInfo } from '@/utils/common';

export type IModalType = 'create' | 'edit' | 'view';
const TouristList: React.FC = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState<ITouristInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({...initPageInfo});
  const [total, setTotal] = useState(0);
  const onFinish: FormProps['onFinish'] = () => {
    queryTouristPage();
  };

  const queryTouristPage = async () => {
    try {
      setLoading(true);
      const formValues = form.getFieldsValue();
      const data = await getTouristPage({
          ...formValues,
          ...pageInfo,
        });
      setList(data.list);
      setTotal(data.total);
    } catch(e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    queryTouristPage();
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
      title: 'Ip',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '国家',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: '省',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: '市',
      dataIndex: 'city',
      key: 'city',
    },
  ];

  return (
    <div>
      <Card bordered={false} style={{ marginBottom: 20 }}>
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <Row>
            <Col span={8}>
              <Form.Item label='ip' name='qp-name-eq'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='国家' name='qp-country-like'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='省' name='qp-province-like'>
                <Input />
              </Form.Item>
            </Col>
          
            <Col span={8}>
              <Form.Item label='市' name='qp-city-like'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={2}>
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
        <Table
          loading={loading}
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
        />
      </Card>
    </div>
  );
};

export default TouristList;
