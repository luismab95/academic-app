import {
  AcademicService,
  AuthService,
  DeviceService,
  UserService,
} from '../../Infrastructure';
import {
  AcademicActions,
  AuthActions,
  DeviceActions,
  UserActions,
} from '../../Application';

const authService = new AuthService();
const userService = new UserService();
const deviceService = new DeviceService();
const academicService = new AcademicService();

export const servicesContainer = {
  auth: new AuthActions(authService),
  user: new UserActions(userService),
  device: new DeviceActions(deviceService),
  academic: new AcademicActions(academicService),
};
