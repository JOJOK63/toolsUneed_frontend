import {Component, OnInit} from '@angular/core';
import {Budget} from '../../model/Budget';
import {BudgetService} from '../../service/budget.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-budget-list',
  imports: [
    FormsModule
  ],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent implements OnInit {
  budgetLists: Budget[] = [];
  selectedBudgetId: number| null = null;
  selectedBudget: Budget | undefined = undefined;

  constructor(private budgetService: BudgetService) {}


  ngOnInit( ) {
      this.budgetLists = this.budgetService.getAllBudgets();
      console.log(this.budgetLists);
  }

  onBudgetChange() {
    if(this.selectedBudgetId){
      this.selectedBudget = this.budgetLists.find(budget => budget.id == this.selectedBudgetId)
    }else{
      this.selectedBudget = undefined
    }
  }
}
