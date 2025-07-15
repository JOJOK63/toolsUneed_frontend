import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BudgetService} from '../../service/budget.service';
import {Budget} from '../../model/Budget';

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
          customerId: 1
        };
        this.budgetService.updateBudget(this.budgetId!, budgetData);
      } else {
        // Mode création
        const budgetData = this.transformFormData(formData);
        this.budgetService.createBudget(budgetData);
      }

      this.budgetForm.reset();
      this.router.navigate(['/budget']);
    }
  }

  private transformFormData(formData: any) {
    return{
      id: this.generateId(),
      name: formData.name,
      detail:formData.detail,
      customerId:1,
    }
  }
//temporaire
  private generateId(): number {
    return this.budgetService.getAllBudgets().length + 1;
  }

  private loadBudgetData() {
    // Charge les données du budget à modifier
    const budget = this.budgetService.getAllBudgets().find(b => b.id === this.budgetId);
    if (budget) {
      this.budgetForm.patchValue({
        name: budget.name,
        detail: budget.detail
      });
    }
  }

  resetForm(){
    this.budgetForm.reset();
  }


}
