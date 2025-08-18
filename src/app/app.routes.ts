import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer/page/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/page/customer-detail/customer-detail.component';
import { NewCustomerComponent } from './customer/page/new-customer/new-customer.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {MonsterListComponent} from './tools/monsterAppCurse/page/monster-list/monster-list.component';
import {NewMonsterComponent} from './tools/monsterAppCurse/page/new-monster/new-monster.component';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {BudgetListComponent} from './tools/budgetGestionApp/page/budget/budget-list/budget-list.component';
import {NewBudgetComponent} from './tools/budgetGestionApp/page/budget/new-budget/new-budget.component';
import {
  TransactionListComponent
} from './tools/budgetGestionApp/page/transaction/transaction-list/transaction-list.component';
import {CategoryListComponent} from './tools/budgetGestionApp/page/category/category-list/category-list.component';
import {
  SubCategoryListComponent
} from './tools/budgetGestionApp/page/sub-category/sub-category-list/sub-category-list.component';

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

  /////////////     Customer
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
    path: 'customer/new/:id',
    component: NewCustomerComponent,
    title: 'Créer un client'
  },
  {
    path: 'customer/:id',
    component: CustomerDetailComponent,
    title: 'Détail du client'
  },

  //////////////     Budget
  {
    path: 'budget',
    component: BudgetListComponent,
    title: 'Liste des budgets'
  },
  {
    path: 'budget/new',
    component: NewBudgetComponent,
    title: "Nouveau budget",
  },
  {
    path: 'budget/new/:id',
    component: NewBudgetComponent,
    title: "Nouveau budget",
  },
  ///////////////   Identification
  // {
  //   path: 'login',
  //   component: ,
  //   title: 'Authentification'
  // }

  ////// Transaction

  {
    path : 'transaction',
    component: TransactionListComponent,
    title: 'Liste des transactions'
  },

  ///// Category
  {
    path : 'category',
    component: CategoryListComponent,
    title: 'Liste des catégories'
  },

  ///// Sub Category
  {
    path : 'sub-category',
    component: SubCategoryListComponent,
    title: 'Liste des sous catégories'
  },

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
    path: 'monster/new/:id',
    component: NewMonsterComponent,
    title: 'nouveau monstre'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
