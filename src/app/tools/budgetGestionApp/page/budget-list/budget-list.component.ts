import {Component, OnInit} from '@angular/core';
import {Budget} from '../../model/Budget';
import {BudgetService} from '../../service/budget.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NewBudgetComponent} from '../new-budget/new-budget.component';

@Component({
  selector: 'app-budget-list',
  imports: [
    FormsModule,
    NewBudgetComponent,
    RouterLink
  ],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent implements OnInit {
  budgetLists: Budget[] = [];
  selectedBudgetId: number| null = null;
  selectedBudget: Budget | undefined = undefined;

  constructor(private budgetService: BudgetService, private router: Router) {}


  ngOnInit( ) {
      this.budgetLists = this.budgetService.getAllBudgets();
      console.log(this.budgetLists);
      this.refreshBudgetList()
  }

  onBudgetChange() {
    if(this.selectedBudgetId){
      this.selectedBudget = this.budgetLists.find(budget => budget.id === Number(this.selectedBudgetId))
    }else{
      this.selectedBudget = undefined
    }
  }

  deleteBudget(id: number | null) {
    if (id === null) return;

    const success = this.budgetService.deleteBudget(Number(id));

    if (success) {
      // Mets à jour la liste
      this.budgetLists = this.budgetLists.filter(b => b.id !== id);
      this.selectedBudgetId = null;
      this.selectedBudget = undefined;
    } else {
      console.error('Erreur : impossible de supprimer le budget');
    }
  }

  updateBudget(id: number, updatedBudget: Budget) {
    this.budgetService.updateBudget(id, updatedBudget)
  }

  editBudget(id: number | null) {
    if (id) {
      this.router.navigate(['/budget/new', id]);
    }
  }

  refreshBudgetList() {
    this.budgetLists = this.budgetService.getAllBudgets();
  }
}
