import {GeneralResponse} from '../../Shared';
import {CertificateData} from '..';

export interface CertificateGateway {
  getCertificate(code: string): Promise<GeneralResponse<string> | null>;
  validateCertificate(
    pdf: string,
  ): Promise<GeneralResponse<CertificateData> | null>;
}
