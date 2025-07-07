import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Customer} from '../../model/Customer';
import {CustomerService} from '../../service/customer.service';
import {CustomerRole} from '../../../utils/user.utils';
import {JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
    NgIf
  ],
  standalone: true,
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {

  customer: Customer={
    firstname :'',
    lastname:'',
    email:'',
    role: false,
  };
    constructor(private customerService: CustomerService) {
    }

    onSubmit(form:any) {
      if(form.valid){
        console.log('Valeurs du formulaire avant envoi :', this.customer);
        this.customerService.newCustomer(this.customer).subscribe({
            next: (customer: Customer) => {
              console.log(customer.firstname);
              console.log(customer.lastname);
              console.log(customer.email);
              console.log(customer.role);
            },
            error: (error)=>{
              if (error.status === 409) {
                console.error("⚠️ Ce client existe déjà.");
                alert("adresse mail déjà utilisé");
              } else {
                console.error("❌ Erreur serveur :", error);
              }
            },
            complete: () => {
              console.log(`Customer ${this.customer.email} ajouté !`);
            }
          }
        );
      }
    }

  resetForm() {
    this.customer = {
      firstname: '',
      lastname: '',
      email: '',
      role: false
    };
  }
}
