import { IModalType } from '@/hooks/useModal';
import { Row, Modal as AModal, Button, Space } from 'antd';
import { PropsWithChildren, useState } from 'react';

interface IModalProps {
  type: IModalType;
  handleCancel: () => void;
  handleOk: () => Promise<void>;
  isModalOpen: boolean;
  [key: string]: any;
}
const Modal: React.FC<PropsWithChildren<IModalProps>> = (props) => {
  const { type, handleCancel, isModalOpen, handleOk, children, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const isView = type === 'view';
  const isEdit = type === 'edit';
  // const isCreate = type === 'create';
  return (
    <AModal
      title={isView ? '查看' : isEdit ? '编辑' : '创建'}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        <Row justify='end'>
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            {isView ? null : (
              <Button
                loading={loading}
                type='primary'
                onClick={async () => {
                  setLoading(true);
                  await handleOk();
                  setLoading(false);
                }}
              >
                确定
              </Button>
            )}
          </Space>
        </Row>
      }
      {...rest}
    >
      {children}
    </AModal>
  );
};

export default Modal;
