import {AuthActions} from '../../actions/auth';
import {AuthService} from '../../infrastructure/http/auth';

const authService = new AuthService();

export const servicesContainer = {
  auth: new AuthActions(authService),
};
