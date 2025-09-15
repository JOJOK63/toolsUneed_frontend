import {Budget} from './Budget';
import {Category} from './Category';
import {SubCategory} from './SubCategory';

export interface Transaction {
  id?: number;
  name: string;
  detail: string;
  amount: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  budget: Budget;
  category: Category;
  subCategory: SubCategory;
}
