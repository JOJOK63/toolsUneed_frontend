import {Component, OnInit} from '@angular/core';
import {Budget} from '../../../model/Budget';
import {BudgetService} from '../../../service/budget.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NewBudgetComponent} from '../new-budget/new-budget.component';
import {Observable} from 'rxjs';
import {TransactionListComponent} from '../../transaction/transaction-list/transaction-list.component';

@Component({
  selector: 'app-budget-list',
  imports: [
    FormsModule,
    RouterLink,
    TransactionListComponent
  ],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent implements OnInit {
  budgetsList: Budget[] = [];
  selectedBudget?: Budget | null;
  selectedBudgetId: number | null = null;
  budgetsListByCustomerId: Budget[] = [];
  ola = 1;

  constructor(private budgetService: BudgetService, private router: Router) {}


  ngOnInit( ) {
    this.budgetService.getAllBudgets().subscribe(budgets => {
      this.budgetsList = budgets;
      console.log(this.budgetsList);
    })
  }


  onBudgetSelected(event : Event) {
    const target = event.target as HTMLSelectElement;
    const budgetId = Number(target.value);
    this.selectedBudget = this.budgetsList.find(budget => budget.id === budgetId);
    this.selectedBudgetId = budgetId;
    // Ici tu peux charger les données du budget sélectionné
    if (this.selectedBudget) {
      this.loadBudgetData(budgetId);
    }
  }

  loadBudgetData(budgetId: number) {
    // Appel à ton service pour récupérer les détails du budget
    this.budgetService.getBudgetById(budgetId).subscribe(data => {
    console.log(data);
    });
  }

  deleteBudget(id : number | null) {
      if(id!=null){
        this.budgetService.deleteBudget(id).subscribe(()=>{
          this.selectedBudget = null;
          this.selectedBudgetId = null;
          this.ngOnInit();
        })
      }
  }


  editBudget(id: any) {
    if (id) {
      this.router.navigate(['/budget/new', id]);
    }
  }

  // refreshBudgetList() {
  // }


}
