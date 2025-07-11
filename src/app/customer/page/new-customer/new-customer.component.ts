import {Component} from '@angular/core';
import {
  AbstractControl, FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {CustomerService} from '../../service/customer.service';
import {NgIf} from '@angular/common';
import {CustomerRole} from '../../../utils/user.utils';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  standalone: true,
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  showPassword: boolean = false;
  customerForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
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


  // Méthode simple pour vérifier si les mots de passe correspondent
  passwordsNotMatch(): boolean {
    const password = this.customerForm.get('password')?.value;
    const confirmPassword = this.customerForm.get('confirmPassword')?.value;
    const confirmPasswordControl = this.customerForm.get('confirmPassword');
    return password !== confirmPassword && (confirmPasswordControl?.touched || false);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // Vérification des mots de passe avant soumission
    if (this.passwordsNotMatch()) {
      console.log('Les mots de passe ne correspondent pas');
      return;
    }

    if (this.customerForm.valid) {
      // 🎯 OPTION 1: Transformer les données directement dans onSubmit
      const formData = this.customerForm.value;
      console.log(formData);
      const customerData = this.transformFormData(formData);
      console.log(customerData);

      // Envoyer au service
      this.customerService.newCustomer(customerData).subscribe({
        next: (response) => {
          console.log('Client créé avec succès:', response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
        }
      });
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
      role:  CustomerRole.USER // Validation ici
// createdAt: new Date().toISOString(),

    };
  }


  resetForm() {
    this.customerForm.reset();
    this.showPassword = false;
  }
}
