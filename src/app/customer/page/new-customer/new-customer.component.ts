import {Component, input, InputSignal} from '@angular/core';
import {Monster} from '../../model/Monster';

@Component({
  selector: 'app-new-customer',
  imports: [],
  standalone: true,
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
 monster : InputSignal<Monster> =  input(new Monster());
}
