import {Component, computed, inject, model, signal} from '@angular/core';
import {NewCustomerComponent} from "../../../../customer/page/new-customer/new-customer.component";
import {SearchbarComponent} from "../../../../component/searchbar/searchbar.component";
import {Monster} from '../../model/Monster';
import {MonsterService} from '../../service/monster.service';
import {NewMonsterComponent} from '../new-monster/new-monster.component';

@Component({
  selector: 'app-monster-list',
  imports: [
    NewCustomerComponent,
    SearchbarComponent,
    NewMonsterComponent
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {
  searchText = model('');
  monsters= signal<Monster[]>([])
  monsterService = inject(MonsterService);

  filteredMonsters = computed(()=>{
    return this.monsters().filter(monster => monster.name.includes(this.searchText()))
  })

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster(){
    const genericMonster = new Monster();
    this.monsterService.add(genericMonster)
    this.monsters.set (this.monsterService.getAll());
  }
}
