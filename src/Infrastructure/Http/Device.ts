import {Device, DeviceGateway} from '../../Domian';
import {errorStore, GeneralResponse} from '../../Shared';
import {axiosApi} from '../Adapters/AxiosAdapter';

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
      errorStore.setState({message: error.message});
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
      errorStore.setState({message: error.message});
      return null;
    }
  }
}
