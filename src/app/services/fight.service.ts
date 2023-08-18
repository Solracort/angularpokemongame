import { Injectable, inject } from '@angular/core';
import { fullPokemonData } from '../pages/interfaces/pokemon.interface';
import { TeamSelectionService } from './team-selection.service';

@Injectable({
  providedIn: 'root'
})
export class FightService {
  
  public mySquad : fullPokemonData[] = [];
  private pokemonFullList : fullPokemonData[] = [];
  private teamService = inject(TeamSelectionService);


  ngOnInit(){
    
  }
  
  
  constructor(){}
}
