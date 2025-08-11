import {Component, OnInit} from '@angular/core';
import {Budget} from '../../model/Budget';
import {BudgetService} from '../../service/budget.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NewBudgetComponent} from '../new-budget/new-budget.component';
import {Observable} from 'rxjs';

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
  budgetsList: Budget[] = [];
  selectedBudgetId: number| null = null;
  selectedBudget: Budget | undefined = undefined;

  constructor(private budgetService: BudgetService, private router: Router) {}


  ngOnInit( ) {
      this.budgetService.getAllBudgets().subscribe((data:any)=>{
        this.budgetsList=data;
    })
   // this.refreshBudgetList();
  }

  onBudgetChange() {
    if(this.selectedBudgetId){
      this.selectedBudget = this.budgetsList.find(budget => budget.id === Number(this.selectedBudgetId))
    }else{
      this.selectedBudget = undefined
    }
  }

  deleteBudget(id: number | null) {
    if (id === null) return;

    console.log('deleteBudget', id);
    console.log(this.selectedBudgetId)
    this.budgetService.deleteBudget(Number(id)).subscribe({
      next: ()=> {
        this.budgetsList = this.budgetsList.filter(b => b.id !== id);
        this.selectedBudgetId = null;
        this.selectedBudget = undefined;
      },
      error: (error)=> {
        console.error('erreur suppression :',error);
      }
    })
  }

  // updateBudget(id: number, updatedBudget: Budget) {
  //   this.budgetService.updateBudget(id, updatedBudget)
  // }

  editBudget(id: number | null) {
    if (id) {
      this.router.navigate(['/budget/new', id]);
    }
  }

  // refreshBudgetList() {
  //   this.budgetList = this.budgetService.getAllBudgets();
  // }
}
