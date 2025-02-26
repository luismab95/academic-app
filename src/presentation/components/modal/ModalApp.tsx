import {Modal} from '@ui-kitten/components';
import {Message, PropsMessageModal} from './Message';
import {SignOut} from './SignOut';

interface Props {
  onCloseModal: () => void;
  visibleModal: boolean;
  content: 'message' | 'sign-out';
  modalInfo?: PropsMessageModal;
  onContinue?: () => void;
}

export const ModalApp = ({
  onCloseModal,
  onContinue,
  visibleModal,
  content,
  modalInfo,
}: Props) => {
  const renderContent = () => {
    switch (content) {
      case 'message':
        return (
          <Message
            title={modalInfo!.title}
            content={modalInfo!.content}
            type={modalInfo!.type}
            onContinue={onCloseModal}
          />
        );
      case 'sign-out':
        return <SignOut onCancel={onCloseModal} onLogout={onContinue!} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      onBackdropPress={onCloseModal}
      visible={visibleModal}
      shouldUseContainer={false}
      animationType="slide">
      {renderContent()}
    </Modal>
  );
};
