import {CustomerRole} from '../../utils/user.utils';

export interface Customer {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  // role: CustomerRole;
  role : boolean
  //createdAt
}
