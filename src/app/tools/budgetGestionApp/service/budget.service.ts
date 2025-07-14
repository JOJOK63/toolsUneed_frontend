import { Injectable } from '@angular/core';
import {Budget} from '../model/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgetLists: Array<Budget> = [];

  constructor() {
    this.budgetLists = [
      {id: 1, name: 'Budget Alimentaire', detail: 'Courses et restaurants', customerId: 1},
      {id: 2, name: 'Budget Transport', detail: 'Essence et transport public', customerId: 1},
      // ... autres budgets
    ];
  }


  // Lecture
  getAllBudgets(): Budget[] {
    return this.budgetLists;
  }

  // getBudgetById(id: number): Budget | undefined { ... }
  // getBudgetsByCustomer(customerId: number): Budget[] { ... }

// Écriture
//   createBudget(budget: Budget): Budget { ... }
//   updateBudget(id: number, budget: Budget): Budget | null { ... }
//   deleteBudget(id: number): boolean { ... }
// }
}
