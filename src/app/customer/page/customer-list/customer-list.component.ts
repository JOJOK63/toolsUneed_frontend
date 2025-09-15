import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {Customer} from '../../model/Customer';
import {RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-customer-list',
  imports: [
    RouterLink
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  standalone:true
})
export class CustomerListComponent implements OnInit {

  customerData:Customer [] = [];
  constructor(private customerService:CustomerService) {

  }

  ngOnInit() {
 this.customerService.getAllCustomers().subscribe((data:any)=>{
      this.customerData=data;
      console.log(this.customerData);
    })
  }


}
