import { Injectable } from '@angular/core';
import {Monster} from '../model/Monster';
import {MonsterType} from '../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters: Monster[] = [];
  currentId: number = 1;


  constructor() {
    this.load()
  }


 private save(){
    localStorage.setItem("monsters", JSON.stringify(this.monsters));
 }

 private load(){
  const monsterData= localStorage.getItem("monsters");
  if(monsterData){
    this.monsters = JSON.parse(monsterData).map((monsterJSON : any)  =>Object.assign(new Monster(), monsterJSON));
    this.currentId = Math.max(...this.monsters.map(monster => monster.id))
  }else{
    this.init();
    this.save();
  }
 }

  getAll(){
    return this.monsters.map(monster => monster.copy());
  }
  get(id: number): Monster | undefined{
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy():undefined;
  }
  add(monster: Monster){
    const monsterCopy = monster.copy();

    monsterCopy.id = this.currentId;
    this.monsters.push(monsterCopy.copy());
    this.currentId++;
    this.save();
    return monsterCopy;
  }
  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();

    const monsterIndex = this.monsters.findIndex(monster => monster.id === monsterCopy.id);
    if (monsterIndex !== -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();

    }
    return monsterCopy;
  }

  delete(id: number) {
    const monsterIndex = this.monsters.findIndex(monster => monster.id === id);
    if (monsterIndex !== -1) {
      this.monsters.splice(monsterIndex, 1);
      this.save();
    }
  }

  private init(){
    this.monsters = [];


    const monster1 = new Monster();
    monster1.name = "Pikachu";
    monster1.hp = 40;
    monster1.figureCaption = "N°002 Pik";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.name = "Carapuce";
    monster2.image = "assets/img/carapuce.png";
    monster2.type = MonsterType.WATER;
    monster2.hp = 60;
    monster2.figureCaption = "N°003 Carapuce";
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.name = "Bulbizarre";
    monster3.image = "assets/img/bulbizarre.png";
    monster3.type = MonsterType.PLANT;
    monster3.hp = 60;
    monster3.figureCaption = "N°004 bulbizarre";
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.name = "Salaméche";
    monster4.image = "assets/img/salameche.png";
    monster4.type = MonsterType.FIRE;
    monster4.hp = 60;
    monster4.figureCaption = "N°005 Salameche";
    this.monsters.push(monster4);
  }
}
