import {GeneralResponse} from '../../Shared';
import {Device} from '..';

export interface DeviceGateway {
  getDeviceBySerie(
    serie: string,
  ): Promise<GeneralResponse<Device | string> | null>;
  createDevice(
    device: Device,
    publicKey: string,
  ): Promise<GeneralResponse<string> | null>;
}
