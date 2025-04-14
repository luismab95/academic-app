import {useEffect, useState} from 'react';
import {AcademicRecord} from '../../Domian';
import {servicesContainer} from '../Providers/ServicesProvider';
import {StorageAdapter} from '../../Infrastructure';

export const AcademicHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>([]);
  const [modal, setModal] = useState<boolean>(false);

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
      setModal(true);
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
    modal,
    setModal,
  };
};
