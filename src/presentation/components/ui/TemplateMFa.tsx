import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Layout} from '@ui-kitten/components';
import {TopNavigationApp} from './TopNavigation';
import {VerifyOtp} from './VerifyOtp';
import {ModalApp} from '../modal/ModalApp';
import {useWindowDimensions} from 'react-native';
import {PropsMessageModal} from '../modal/Message';

interface Props {
  title: string;
  isLoading: boolean;
  message: string;
  modalInfo: PropsMessageModal;
  visibleModal: boolean;
  onVerifyOtp: (otp: string) => void;
  onResendOtp: () => void;
  onCloseModal: () => void;
}

export const TemplateMFa = ({
  title,
  isLoading,
  message,
  visibleModal,
  modalInfo,
  onVerifyOtp,
  onResendOtp,
  onCloseModal,
}: Props) => {
  const {width} = useWindowDimensions();

  return (
    <>
      <TopNavigationApp title={title} />
      <Layout style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: width > 400 ? 40 : 20,
          }}>
          <VerifyOtp
            isLoading={isLoading}
            message={message}
            onVerifyOtp={onVerifyOtp}
            onResendOtp={onResendOtp}
          />
        </ScrollView>
      </Layout>

      {/* MODAL */}
      <ModalApp
        content="message"
        visibleModal={visibleModal}
        onCloseModal={onCloseModal}
        modalInfo={modalInfo}
      />
    </>
  );
};
