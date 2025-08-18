import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/Customer';
import { CustomerRole } from '../../../utils/user.utils';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit {
  showPassword: boolean = false;
  customerForm: FormGroup;
  customerId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Création du formulaire avec FormBuilder
    this.customerForm = this.fb.group({
      firstname: ['', [
        Validators.required,
        Validators.minLength(2),
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      image: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    // Récupère l'ID de l'URL
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.customerId) {
      this.isEditMode = true;
      this.loadCustomerData();
      // Désactive la validation du mot de passe en mode édition
      this.disablePasswordValidators();
    }
  }

  private loadCustomerData() {
    this.customerService.getCustomerById(this.customerId!).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          firstname: customer.firstname,
          lastname: customer.lastname,
          email: customer.email,
          image: customer.image
          // Les mots de passe ne sont pas chargés pour la sécurité
        });
      },
      error: (error) => console.error('Erreur chargement customer:', error)
    });
  }

  // Méthode pour vérifier si les mots de passe correspondent (uniquement en mode création)
  passwordsNotMatch(): boolean {
    if (this.isEditMode) return false; // Pas de validation password en mode édition

    const password = this.customerForm.get('password')?.value;
    const confirmPassword = this.customerForm.get('confirmPassword')?.value;
    const confirmPasswordControl = this.customerForm.get('confirmPassword');

    return password !== confirmPassword && (confirmPasswordControl?.touched || false);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // Vérification des mots de passe seulement en mode création
    if (!this.isEditMode && this.passwordsNotMatch()) {
      console.log('Les mots de passe ne correspondent pas');
      return;
    }

    if (this.customerForm.valid) {
      const formData = this.customerForm.value;

      if (this.isEditMode) {
        // Mode modification - sans password
        const customerData: Customer = {
          id: this.customerId!,
          firstname: formData.firstname?.trim().toLowerCase(),
          lastname: formData.lastname?.trim().toLowerCase(),
          email: formData.email?.trim(),
          image: formData.image?.trim(),
          role: CustomerRole.USER,
          password: formData.password,
        };

        this.customerService.updateCustomer(customerData).subscribe({
          next: (response) => {
            console.log('Client modifié avec succès:', response);
            this.router.navigate(['/customer']);
          },
          error: (error) => {
            console.error('Erreur lors de la modification:', error);
          }
        });
      } else {
        // Mode création - avec password
        const customerData = this.transformFormData(formData);

        this.customerService.createCustomer(customerData).subscribe({
          next: (response) => {
            console.log('Client créé avec succès:', response);
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
            this.resetForm();
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
          }
        });
      }
    } else {
      console.log('Formulaire invalide');
    }
  }

  private transformFormData(formData: any) {
    return {
      firstname: formData.firstname?.trim().toLowerCase(),
      lastname: formData.lastname?.trim().toLowerCase(),
      email: formData.email?.trim().toLowerCase(),
      password: formData.password,
      role: CustomerRole.USER,
      image: formData.image?.trim().toLowerCase()
    };
  }

  resetForm() {
    this.customerForm.reset();
    this.showPassword = false;
  }

  private disablePasswordValidators() {
    this.customerForm.get('password')?.clearValidators();
    this.customerForm.get('confirmPassword')?.clearValidators();
    this.customerForm.get('password')?.updateValueAndValidity();
    this.customerForm.get('confirmPassword')?.updateValueAndValidity();
  }
}
