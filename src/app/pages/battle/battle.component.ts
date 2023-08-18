import { Component, inject } from '@angular/core';
import { FightService } from 'src/app/services/fight.service';
import { fullPokemonData } from '../interfaces/pokemon.interface';
import { TeamSelectionService } from 'src/app/services/team-selection.service';

@Component({
  selector: 'battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent {
  private fightService = inject(FightService);
  private teamService  = inject(TeamSelectionService);
  public pokemon100List:fullPokemonData[] =  [];
  
  public mySquad :fullPokemonData[]= [];
  private enemySquadIds: number[] = [];
  public myEnemySquad: fullPokemonData[]  = [];
  
  private localStorageKeyEnemy = 'myEnemySquadData';
  private localStorageKeySquad =  'mySquadData'


  
  constructor(){
    this.pokemon100List = this.teamService.pokemonFullList;
    this.loadMyEnemySquadFromLocalStorage();
    this.loadMySquadFromLocalStorage();
    // console.log('lista completa:',this.pokemon100List)
    this.createMyEnemySquad();
    
    
  };
  ngOnInit(){ 
  }
  setEnemySquadIds(){ // firstly we get the ids for the enemy Squad
    while (this.enemySquadIds.length < 4) {
      const randomNumber = Math.floor(Math.random() * 100);

      if (!this.enemySquadIds.includes(randomNumber)) {
        this.enemySquadIds.push(randomNumber);
      }
    }
  };
  pokemonFromFullList(id: number): fullPokemonData | undefined { 
    const foundPokemon: fullPokemonData | undefined = this.pokemon100List?.find(pokemon => pokemon.id === id);
    return foundPokemon;
  };
  createMyEnemySquad(){
    if (this.myEnemySquad.length !== 4){
      this.setEnemySquadIds();
      let i = 0;
      while (i < this.enemySquadIds.length){
        let foundPokemon:fullPokemonData | undefined = this.pokemonFromFullList(this.enemySquadIds[i]);
        console.log('Result de pokemonFromFullList:' , this.enemySquadIds[i], foundPokemon);
        if (foundPokemon !== undefined) { 
          this.myEnemySquad?.push(foundPokemon);
        };
        i++;
      }
      console.log('Enemies: ', this.myEnemySquad)
      this.saveMyEnemySquadToLocalStorage()
    }
  };

  private loadMyEnemySquadFromLocalStorage() {
    const myEnemySquadData = localStorage.getItem(this.localStorageKeyEnemy);
    if (myEnemySquadData) {
      this.myEnemySquad = JSON.parse(myEnemySquadData);
    }
  }

  private loadMySquadFromLocalStorage() {
    const mySquadData = localStorage.getItem(this.localStorageKeySquad);
    if (mySquadData) {
      this.mySquad = JSON.parse(mySquadData);
    }
  }
  private saveMyEnemySquadToLocalStorage() {
    localStorage.setItem(this.localStorageKeyEnemy, JSON.stringify(this.myEnemySquad));
  }
}
