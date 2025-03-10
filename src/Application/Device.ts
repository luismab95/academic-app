import {Device, DeviceGateway} from '../Domian';
import {StorageAdapter} from '../Infrastructure';
import {generateKeys} from '../Shared';

export class DeviceActions {
  constructor(private readonly deviceService: DeviceGateway) {}

  async getDeviceBySerie(serie: string) {
    return this.deviceService.getDeviceBySerie(serie);
  }

  async createDevice(device: Device) {
    await generateKeys();
    const publicKey = await StorageAdapter.getItem('publicKey');
    return this.deviceService.createDevice(device, publicKey!);
  }
}
