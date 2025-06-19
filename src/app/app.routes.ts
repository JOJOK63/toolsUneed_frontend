import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer/page/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/page/customer-detail/customer-detail.component';
import { NewCustomerComponent } from './customer/page/new-customer/new-customer.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'customer',
    component: CustomerListComponent,
    title: 'Liste des clients'
  },
  {
    path: 'customer/new',
    component: NewCustomerComponent,
    title: 'Créer un client'
  },
  {
    path: 'customer/:id',
    component: CustomerDetailComponent,
    title: 'Détail du client'
  }
];
