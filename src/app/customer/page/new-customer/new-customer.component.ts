import {Component, computed, Input, input, InputSignal, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
    customerForm = new FormGroup('');
}
