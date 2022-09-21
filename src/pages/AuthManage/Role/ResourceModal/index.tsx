import { Modal, Form, Radio, message } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/store';
import { getMenuList, IMenuInfo, getMenuListByRoleId } from '@/api/menu';
import {
  getApiItemDistributableList,
  getApiItemListByRoleId,
  IApiItemInfo,
} from '@/api/apiItem';
import { IRoleInfo } from '@/store/role';
import ResourceCheck from './ResourceCheck';
import { distributionResource } from '@/api/role';

interface IUserModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: IRoleInfo;
}

const ResourceModal: React.FC<IUserModalProps> = (props) => {
  const { isModalOpen, handleCancel, data } = props;
  const [apiItemList, setApiItemList] = useState<IApiItemInfo[]>([]);
  const [menulist, setMenuList] = useState<IMenuInfo[]>([]);
  const [parentsMap, setParentsMap] = useState<Record<number, any>>({});
  const { allDicItems } = useAppSelector((state) => ({
    allDicItems: state.global.allDicItems,
  }));
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      await distributionResource(Object.assign({ id: data.id }, values));
      message.success('操作成功');
      handleCancel();
    });
  };

  const getParentsMap = (data: any, records: Record<number, any>) => {
    data.forEach((d: any) => {
      records[d.id] = [d];
      if (records[d.parentId]) {
        records[d.id].push(...records[d.parentId]);
      }
      if (d.children) {
        getParentsMap(d.children, records);
      }
    });
  };
  const getData = async (type: 'api' | 'menu') => {
    if (data) {
      let list;
      let listWithIds;
      if (type === 'menu') {
        [list, listWithIds] = await Promise.all([
          getMenuList(),
          getMenuListByRoleId(data.id),
        ]);
      } else if (type === 'api') {
        [list, listWithIds] = await Promise.all([
          getApiItemDistributableList(),
          getApiItemListByRoleId(data.id),
        ]);
      }
      if (list && listWithIds) {
        const records: Record<number, any> = {};
        getParentsMap(list, records);
        setParentsMap(records);
        if(type === 'menu') {
          setMenuList(list);
        } else if(type === 'api') {
          setApiItemList(list);
        }
        form.setFieldValue(
          'resourceIds',
          listWithIds.filter((d) => records[d.id]).map((d) => d.id)
        );
      }
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      const type = form.getFieldValue('type');
      getData(type);
    } else {
      setMenuList([]);
      setApiItemList([]);
      setParentsMap([]);
      form.resetFields();
    }
  }, [isModalOpen, data.id]);

  return (
    <Modal
      title={`${data.name}分配资源`}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      width={800}
    >
      <Form
        form={form}
        autoComplete='off'
        initialValues={{ type: 'api' }}
        layout='vertical'
      >
        <Form.Item
          name='type'
          label='资源类型'
          rules={[{ required: true, message: '请选择资源类型' }]}
        >
          <Radio.Group
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'api') {
                getData(value).catch(() => {
                  setParentsMap([]);
                  setMenuList([]);
                });
              } else if (value === 'menu') {
                getData(value).catch(() => {
                  setParentsMap([]);
                  setApiItemList([]);
                });
              }
            }}
          >
            {allDicItems.RESOURCE_TYPE?.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item dependencies={['type']}>
          {({ getFieldValue }) => {
            const type = getFieldValue('type');
            return (
              <Form.Item name='resourceIds' label='资源列表'>
                <ResourceCheck
                  type={type}
                  list={type === 'api' ? apiItemList : menulist}
                  parentsMap={parentsMap}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResourceModal;
