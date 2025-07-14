import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer/page/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/page/customer-detail/customer-detail.component';
import { NewCustomerComponent } from './customer/page/new-customer/new-customer.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {MonsterListComponent} from './tools/monsterAppCurse/page/monster-list/monster-list.component';
import {NewMonsterComponent} from './tools/monsterAppCurse/page/new-monster/new-monster.component';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {BudgetListComponent} from './tools/budgetGestionApp/component/budget-list/budget-list.component';

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

  ////customer
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
  },

  ////////////// budget
  {
    path: 'budget',
    component: BudgetListComponent,
    title: 'Liste des budgets'
  },
  ////// identification
  // {
  //   path: 'login',
  //   component: ,
  //   title: 'Authentification'
  // }
  ////monster curse

  {
    path: 'monster',
    component: MonsterListComponent,
    title: 'Liste de monstres'
  },
  {
    path: 'monster/new',
    component: NewMonsterComponent,
    title: 'nouveau monstre'
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];
