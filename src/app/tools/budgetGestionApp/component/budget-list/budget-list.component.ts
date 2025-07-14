import {Component, OnInit} from '@angular/core';
import {Budget} from '../../model/Budget';
import {BudgetService} from '../../service/budget.service';

@Component({
  selector: 'app-budget-list',
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent implements OnInit {
  budgetLists: Budget[] = [];

  constructor(private budgetService: BudgetService) {}


  ngOnInit( ) {
      this.budgetService.getAllBudgets();
      this.budgetLists = this.budgetService.getAllBudgets();
      console.log(this.budgetLists);
  }
}
