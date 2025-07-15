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

   getBudgetById(id: number): Budget | undefined {
    return this.budgetLists.find(budget => budget.id === id);
   }

   getBudgetsByCustomer(customerId: number): Budget[] {
    return this.budgetLists.filter(budget => budget.customerId === customerId);
   }

// Écriture
   createBudget(budget: Budget): Budget {
    this.budgetLists.push(budget);
    return budget;
   }

  updateBudget(id: number, updatedBudget: Budget): Budget | null {
    const index = this.budgetLists.findIndex(budget => budget.id === id);
    if (index !== -1) {
      this.budgetLists[index] = updatedBudget;
      return updatedBudget;
    }
    return null;
  }


  deleteBudget(id: number): boolean {
    const index = this.budgetLists.findIndex(budget => budget.id === id);

    if (index !== -1) {
      this.budgetLists.splice(index, 1); // Supprime 1 élément à l'index trouvé
      return true;
    }

    return false; // Aucun budget trouvé avec cet id
  }

}
