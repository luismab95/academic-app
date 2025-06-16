import DeviceInfo from 'react-native-device-info';
import {Device} from '../../Domian';
import {servicesContainer} from '..';

export const createDevice = async () => {
  const device = {
    name: await DeviceInfo.getDeviceName(),
    serie: await DeviceInfo.getUniqueId(),
    type: DeviceInfo.getModel(),
    operationSystem: DeviceInfo.getSystemName(),
    version: DeviceInfo.getSystemVersion(),
  } as Device;

  return await servicesContainer.device.createDevice(device);
};
