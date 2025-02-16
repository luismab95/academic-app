import {Device, DeviceGateway} from '../../domian';
import {errorStore, GeneralResponse} from '../../shared';
import {axiosApi} from '../adapters/axiosApi';

export class DeviceService implements DeviceGateway {
  async getDeviceBySerie(
    serie: string,
  ): Promise<GeneralResponse<Device | string> | null> {
    try {
      const {data} = await axiosApi.get<GeneralResponse<Device | string>>(
        `/device/${serie}`,
      );
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }

  async createDevice(
    device: Device,
    publicKey: string,
  ): Promise<GeneralResponse<string> | null> {
    try {
      const {data} = await axiosApi.post<GeneralResponse<string>>('/device', {
        device,
        publicKey,
      });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      errorStore.setState({message: errorMessage});
      return null;
    }
  }
}
