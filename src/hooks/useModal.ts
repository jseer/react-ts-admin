import { useState } from 'react';

export type IModalType = 'create' | 'edit' | 'view';
const useModal = <T>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>('create');
  const [modalData, setModalData] = useState<T | null>(null);

  const showModal = (type: IModalType, data: T | null) => {
    setIsModalOpen(true);
    setModalType(type);
    setModalData(data);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setModalType('create');
    setModalData(null);
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