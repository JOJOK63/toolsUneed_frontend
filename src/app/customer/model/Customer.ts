import {CustomerRole} from '../../utils/user.utils';

export interface Customer {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password : string
  role: CustomerRole;
}
