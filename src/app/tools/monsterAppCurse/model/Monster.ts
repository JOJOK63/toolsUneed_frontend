import {MonsterType} from '../utils/monster.utils';

export class Monster{
  id : number =-1;
  name: string =" my monster";
  image: string = "assets/img/pikachu.png";
  type: MonsterType = MonsterType.ELECTRIC;
  hp :number =40 ;
  figureCaption : string ="N°001";
  attackName: string =" geo impact";
  attackStrength:number = 60;
  attackDescription:string="one attack with many damage"


  copy(): Monster {
    return Object.assign(new Monster(), this);
  }

}
