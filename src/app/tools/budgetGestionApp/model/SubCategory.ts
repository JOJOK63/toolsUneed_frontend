import {Category} from './Category';

export interface SubCategory {
  id?: string;
  name: string;
  icon: string;
  isActive: boolean;
  category: Category;
}
