import {useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-notifications';
import {AcademicRecord} from '../../Domian';
import {AlertError} from '../../Presentation/Components';
import {servicesContainer} from '../Providers/ServicesProvider';
import {StorageAdapter} from '../../Infrastructure';

export const AcademicHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>([]);

  useEffect(() => {
    getAcademic();
  }, []);

  const getAcademic = async () => {
    setIsLoading(true);
    const academic = await StorageAdapter.getItem('academic');
    if (academic !== null) {
      setAcademicRecords(JSON.parse(academic));
      setIsLoading(false);
      return;
    }

    const response = await servicesContainer.academic.getAcademic();
    if (response === null) {
      Toast.show(<AlertError />, {
        type: 'danger',
        placement: 'center',
        duration: 3000,
        animationType: 'zoom-in',
        dangerColor: 'transparent',
      });
      setIsLoading(false);
      return;
    }

    setAcademicRecords(response.data);
    await StorageAdapter.setItem('academic', JSON.stringify(response.data));
    setIsLoading(false);
  };

  return {
    academicRecords,
    isLoading,
  };
};
