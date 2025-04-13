import {
  AcademicService,
  AuthService,
  DeviceService,
  UserService,
  CertificateService,
} from '../../Infrastructure';
import {
  AcademicActions,
  AuthActions,
  CertificateActions,
  DeviceActions,
  UserActions,
} from '../../Application';

const authService = new AuthService();
const userService = new UserService();
const deviceService = new DeviceService();
const academicService = new AcademicService();
const certificateService = new CertificateService();

export const servicesContainer = {
  auth: new AuthActions(authService),
  user: new UserActions(userService),
  device: new DeviceActions(deviceService),
  academic: new AcademicActions(academicService),
  certificate: new CertificateActions(certificateService),
};
