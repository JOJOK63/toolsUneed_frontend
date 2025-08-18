import {Component, OnInit} from '@angular/core';
import {formatDate, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BudgetService} from '../../../service/budget.service';
import {Budget} from '../../../model/Budget';

@Component({
  selector: 'app-new-budget',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-budget.component.html',
  styleUrl: './new-budget.component.css'
})
export class NewBudgetComponent implements OnInit {
  budgetForm: FormGroup;
  budgetId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.budgetForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      detail:['',[
        Validators.required,
      ]],
      balance:['0.0',[
        Validators.required,
      ]]
    })
  }


  ngOnInit() {
    // Récupère l'ID de l'URL
    this.budgetId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.budgetId) {
      this.isEditMode = true;
      this.loadBudgetData();
    }
  }

  onSubmit() {
    if(this.budgetForm.valid) {
      const formData = this.budgetForm.value;

      if (this.isEditMode) {
        // Mode modification
        const budgetData : Budget =  {
          id: this.budgetId!,
          name: formData.name,
          detail: formData.detail,
          balance: formData.balance,
          customer: {
            id :1
          }
        };
        this.budgetService.updateBudget( budgetData).subscribe({
          next: () => {
            this.budgetForm.reset();
            this.router.navigate(['/budget']);
          },
          error: (error) => console.error('Erreur update:', error)
        })
      } else {
        const budgetData = this.transformFormData(formData);

        this.budgetService.createBudget(budgetData).subscribe({
          next: () => {
            this.budgetForm.reset();
            this.router.navigate(['/budget']);
          },
          error: (error) => console.error('Erreur création:', error)
        });
      }
    }
  }

  private transformFormData(formData: any) {
    return{
      name: formData.name,
      detail:formData.detail,
      balance:formData.balance,
      customer: {
        id : 1
      }
    }
  }

  private loadBudgetData() {
    this.budgetService.getBudgetById(this.budgetId!).subscribe({
      next: (budget) => {
        this.budgetForm.patchValue({
          name: budget.name,
          detail: budget.detail,
          balance: budget.balance,
        });
      },
      error: (error) => console.error('Erreur chargement budget:', error)
    });
  }

  resetForm(){
    this.budgetForm.reset();
  }


}
