import {useState} from 'react';
import {PropsMessageModal} from '../../presentation/components';
import {errorStore} from '../store/error.store';

interface Props {
  visibleModal: boolean;
  modalInfo: PropsMessageModal;
  loadModalInfo: (modal: PropsMessageModal) => void;
  onCloseModal: () => void;
}

export const ModalHook = (): Props => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Aviso',
    content: '',
    type: 'success',
  } as PropsMessageModal);

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  const loadModalInfo = (modal: PropsMessageModal) => {
    setModalInfo({
      title: modal.title,
      content: modal.content ?? errorStore.getState().message,
      type: modal.type,
    } as PropsMessageModal);
    setVisibleModal(true);
  };

  return {
    visibleModal,
    modalInfo,
    loadModalInfo,
    onCloseModal,
  };
};
