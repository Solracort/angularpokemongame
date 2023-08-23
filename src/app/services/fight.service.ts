import { Injectable, inject } from '@angular/core';
import { fullPokemonData } from '../pages/interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class FightService {
  
  public mySquad : fullPokemonData[] = [];
  // public attackType : 'SpecialAttack'| 'Attack' = 'Attack';
  public beat :{name: string, myAction:string, power:number} = {name:"", myAction:"",power: 0} ;

  ngOnInit(){
    
  }
  attack(pokemon:fullPokemonData){
    const dice = (Math.floor(Math.random() * 6)+1);
      this.beat.name=pokemon.name;
      if (dice % 2 !== 0) this.beat.myAction="SpecialAttack";
      else this.beat.myAction= "Attack";

      if (this.beat.myAction === 'Attack')
        this.beat.power = Math.trunc(((pokemon.base_experience / 100) * dice * pokemon.stats[1].base_stat)/10);
      else if (this.beat.myAction = 'SpecialAttack')
        this.beat.power = Math.trunc(((pokemon.base_experience / 100) * dice * (1.2)*pokemon.stats[3].base_stat)/10);

      // console.log( pokemon.name, dice, this.beat.myAction, this.beat.power);
      return this.beat;
    }
  defense(pokemon:fullPokemonData){
    const dice = Math.floor(Math.random() * 6);
    this.beat.name=pokemon.name;
      if (dice % 2 !== 0) this.beat.myAction="SpecialDefense";
      else this.beat.myAction= "Defense";

      if (this.beat.myAction === 'Defense')
        this.beat.power = Math.trunc(((pokemon.base_experience / 100) * dice * pokemon.stats[2].base_stat)/10);
      else if (this.beat.myAction = 'SpecialDefense')
        this.beat.power = Math.trunc(((pokemon.base_experience / 100) * dice * (1.2)*pokemon.stats[4].base_stat)/10);

      // console.log( pokemon.name, dice, this.beat.myAction, this.beat.power);
      return this.beat;

  }
  constructor(){}
}
