import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { fullPokemonData } from 'src/app/pages/interfaces/pokemon.interface';
import { FightService } from 'src/app/services/fight.service';
import { TeamSelectionService } from 'src/app/services/team-selection.service';

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit{

  private teamSelection = inject(TeamSelectionService);
  private fightService = inject(FightService);
  public pokemonDetailed : (fullPokemonData | null) = null;
  private subscription: Subscription | undefined;
  public mySquad : fullPokemonData[] = [];
  private localStorageKey = 'mySquadData';
  public sizeSquad: number = 0;
  public maxSquad : number = 4;

  ngOnInit(): void {
    this.loadMySquadFromLocalStorage();
    this.updateSizeSquad();
    this.subscription = this.teamSelection.currentPokemon$.subscribe(
      (p)=>{
        if(p) this.pokemonDetailed = {...p}
        console.log('PokemonDetailed:', this.pokemonDetailed)
      }  
    )
  }
  getAbilities(){
    if (this.pokemonDetailed && this.pokemonDetailed.abilities) {
      for (const ability of this.pokemonDetailed.abilities) {
        return this.pokemonDetailed.abilities.map(ability => ability.ability.name);      }
    }
    return[];
  }
  getStats(){
    if (this.pokemonDetailed && this.pokemonDetailed.stats) {
      for (const stat of this.pokemonDetailed.stats) {
        return this.pokemonDetailed.stats.map(stat => ({
          name:  stat.stat.name , 
          value: stat.base_stat
        }));      }
    }
    return[];
  }
  addPokemon(){
    const idExists = this.mySquad.some(obj =>{ 
                                  return obj.id === this.pokemonDetailed?.id;                                
                                });
    if (!idExists && this.pokemonDetailed && this.mySquad.length< this.maxSquad){
      this.mySquad.push(this.pokemonDetailed);
      console.log('mySquad:', this.mySquad)
    }
    this.updateSizeSquad()
    this.saveMySquadToLocalStorage();
  }
  deletePokemon(){
    if (this.pokemonDetailed) {
      const index = this.mySquad.findIndex(obj => obj.id === this.pokemonDetailed?.id);
      if (index !== -1) {
        this.mySquad.splice(index, 1);
      }
    }
    this.updateSizeSquad();
    this.saveMySquadToLocalStorage();
  }
  private loadMySquadFromLocalStorage() {
    const mySquadData = localStorage.getItem(this.localStorageKey);
    if (mySquadData) {
      this.mySquad = JSON.parse(mySquadData);
    }
  }
  private saveMySquadToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.mySquad));
  }
  updateSizeSquad(){
    this.sizeSquad= this.mySquad.length;
    console.log('SizeSquad:', this.sizeSquad);
  }
  sendMySquad(){
    this.fightService.mySquad = this.mySquad;
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.saveMySquadToLocalStorage();
  }
}
