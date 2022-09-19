import { Button, Modal, Transfer } from 'antd';
import type { TransferDirection, TransferListProps } from 'antd/es/transfer';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { IModalType } from '.';
import { IRoleInfo } from '@/store/role';
import { IUserInfo } from '@/store/user';
import { getUserList, getUserListByRoleId } from '@/api/user';
import { distributionUser } from '@/api/role';

interface IUserModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: IRoleInfo;
}
const UserModal: React.FC<IUserModalProps> = (props) => {
  const { isModalOpen, handleCancel, data } = props;
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [list, setList] = useState<IUserInfo[]>([]);
  const handleOk = async () => {
        await distributionUser({ roleIds: [data.id], userIds: targetKeys.map((s) => Number(s))});
        // message.success('更新成功');
      handleCancel();
  };

  const getData = () => {
    if(data) {
      getUserList().then((data) => {
        setList(data);
      });
      getUserListByRoleId(data.id!).then((data) => {
        setTargetKeys(data.map((d) => String(d.id)));
      });
    }
  }
  useEffect(() => {
    if (isModalOpen) {
      getData();
    } else {
      setList([]);
      setTargetKeys([]);
    }
  }, [isModalOpen, data.id]);

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  const renderFooter = (
    _: TransferListProps<any>,
    info?: {
      direction: TransferDirection;
    }
  ) => {
    if (info?.direction === 'left') {
      return (
        <Button
          size='small'
          style={{ float: 'left', margin: 5 }}
          onClick={getData}
          type="link"
        >
          重置
        </Button>
      );
    }
  };
  return (
    <Modal
      title={`${data.name}分配用户`}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      width={600}
    >
      <Transfer
        dataSource={list}
        showSearch
        listStyle={{
          width: 250,
          height: 300,
        }}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => `${item.name}`}
        footer={renderFooter}
        rowKey={(record) => String(record.id)}
      />
    </Modal>
  );
};

export default UserModal;
