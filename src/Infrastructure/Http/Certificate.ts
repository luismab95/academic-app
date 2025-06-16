import {CertificateData, CertificateGateway} from '../../Domian';
import {errorStore, GeneralResponse} from '../../Shared';
import {axiosApi} from '../Adapters/AxiosAdapter';

export class CertificateService implements CertificateGateway {
  async getCertificate(code: string): Promise<GeneralResponse<string> | null> {
    try {
      const {data} = await axiosApi.post<GeneralResponse<string>>(
        `/certificate/download`,
        {code},
      );

      return data;
    } catch (error: any) {
      errorStore.setState({message: error.message});
      return null;
    }
  }

  async validateCertificate(
    pdf: string,
  ): Promise<GeneralResponse<CertificateData> | null> {
    try {
      const {data} = await axiosApi.post<GeneralResponse<CertificateData>>(
        `/certificate/validate`,
        {pdf},
      );

      return data;
    } catch (error: any) {
      errorStore.setState({message: error.message});
      return null;
    }
  }
}
