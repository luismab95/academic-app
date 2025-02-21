import {GeneralResponse} from '../../shared';
import {Device} from '../entittes/device';

export interface DeviceGateway {
  getDeviceBySerie(
    serie: string,
  ): Promise<GeneralResponse<Device | string> | null>;
  createDevice(
    device: Device,
    publicKey: string,
  ): Promise<GeneralResponse<string> | null>;
}
