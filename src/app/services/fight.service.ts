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
  checkTypes(type1:string, type2:string):number{
    let typeResult = 1;
    switch (type1){
      case 'grass': 
          if (type2='bug' || 'fire') {typeResult = 1.25};
        break;
        case 'fire': 
          if (type2='water' || 'ground') {typeResult = 1.25};
        break;
        case 'water': 
          if (type2='electric' || 'grass') {typeResult = 1.25};
        break;
        case 'bug': 
          if (type2='fire' || 'rock') {typeResult = 1.25};
        break;
        case 'normal': 
          if (type2='fighting' || 'psychic') {typeResult = 1.25};
        break;
        case 'poison': 
          if (type2='grass' || 'water') {typeResult = 1.25};
        break;
        case 'electric': 
          if (type2='ground' || 'rock') {typeResult = 1.25};
        break;
        case 'ground': 
          if (type2='water' || 'grass') {typeResult = 1.25};
        break;
        case 'fairy': 
          if (type2='ghost' || 'poison') {typeResult = 1.25};
        break;
        case 'fighting': 
          if (type2='fairy' || 'psychic') {typeResult = 1.25};
        break
        case 'psychic': 
          if (type2='bug' || 'ghost') {typeResult = 1.25};
        break;
        case 'rock': 
          if (type2='water' || 'fighting') {typeResult = 1.25};
        break;
        case 'ghost': 
          if (type2='ghost' || 'fairy') {typeResult = 1.25};
        break;

    }
    
    return typeResult;
  }
  constructor(){}
}
