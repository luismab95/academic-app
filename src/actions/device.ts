import {Device, DeviceGateway} from '../domian';
import {StorageAdapter} from '../infrastructure/adapters/storage';
import {generateKeys} from '../shared';

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
