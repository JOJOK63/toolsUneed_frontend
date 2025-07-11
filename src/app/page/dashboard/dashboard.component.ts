import {Component, computed, effect, inject, model, signal} from '@angular/core';
import {NewCustomerComponent} from '../../customer/page/new-customer/new-customer.component';
import {Monster} from '../../tools/monsterAppCurse/model/Monster';
import {SearchbarComponent} from '../../component/searchbar/searchbar.component';
import {MonsterType} from '../../tools/monsterAppCurse/utils/monster.utils';
import {CommonModule} from '@angular/common';
import {MonsterService} from '../../tools/monsterAppCurse/service/monster.service';
import {MonsterListComponent} from '../../tools/monsterAppCurse/page/monster-list/monster-list.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    NewCustomerComponent,
    SearchbarComponent, CommonModule, MonsterListComponent, RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
