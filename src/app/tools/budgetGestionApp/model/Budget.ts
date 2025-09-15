import {Customer} from '../../../customer/model/Customer';

export interface Budget {
  id?: number;
  name: string;
  detail: string;
  balance: number;
  customer: Customer;
}
