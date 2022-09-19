import { useState } from 'react';

export type IModalType = 'create' | 'edit' | 'view';
const useModal = <T>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>('create');
  const [modalData, setModalData] = useState<T>({} as T);

  const showModal = (type: IModalType, data: T) => {
    setIsModalOpen(true);
    setModalType(type);
    setModalData(data);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setModalType('create');
    setModalData({} as T);
  };
  return {
    showModal,
    hideModal,
    isModalOpen,
    modalType,
    modalData,
  }
}

export default useModal;