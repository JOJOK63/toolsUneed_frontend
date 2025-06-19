import {Component, Input} from '@angular/core';
import {NewCustomerComponent} from '../../customer/page/new-customer/new-customer.component';
import {Monster} from '../../customer/model/Monster';
import {SearchbarComponent} from '../../component/searchbar/searchbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NewCustomerComponent,
    SearchbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  searchText: string ="";
  monster1!: Monster;

  constructor() {
    this.monster1 = new Monster();
    this.monster1.name = 'John';
    this.monster1.figureCaption="008";
  }
}
