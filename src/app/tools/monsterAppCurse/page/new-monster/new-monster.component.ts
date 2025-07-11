import {Component, computed, Input, input, InputSignal, OnChanges, SimpleChanges} from '@angular/core';
import {Monster} from '../../model/Monster';
import {MonsterTypeProperties} from '../../utils/monster.utils';

@Component({
  selector: 'app-new-monster',
  imports: [],
  templateUrl: './new-monster.component.html',
  styleUrl: './new-monster.component.css'
})
export class NewMonsterComponent {
  monster = input(new Monster());
  monsterTypeIcon = computed(() => {return MonsterTypeProperties[this.monster().type].imageUrl });
  backgroundColor = computed(()=>{ return MonsterTypeProperties[this.monster().type].color });
}
