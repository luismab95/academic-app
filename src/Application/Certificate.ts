import {CertificateGateway} from '../Domian';

export class CertificateActions {
  constructor(private readonly certificateGateway: CertificateGateway) {}

  async getCertificate(code: string) {
    return this.certificateGateway.getCertificate(code);
  }

  async validateCertificate(pdf: string) {
    return this.certificateGateway.validateCertificate(pdf);
  }
}
