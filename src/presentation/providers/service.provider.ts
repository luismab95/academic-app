import {AcademicActions, AuthActions, DeviceActions, UserActions} from '../../actions';
import {AuthService} from '../../infrastructure/http/auth';
import {DeviceService} from '../../infrastructure/http/device';
import {UserService} from '../../infrastructure/http/user';
import {AcademicService} from '../../infrastructure/http/academic';

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
