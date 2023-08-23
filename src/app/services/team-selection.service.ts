import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { fullPokemonData } from '../pages/interfaces/pokemon.interface';
import { PokemonApiService } from './pokemon-api.service';

@Injectable({
  providedIn: 'root'
})
export class TeamSelectionService {
  
  private pokemonService = inject(PokemonApiService);
  private maxNumber: number = 100;//controls de the number of pokemon to store from the API 
  private pokemon100List : fullPokemonData[] = []; // the list to store the pokemons from API
  
  private pokemonSelected$ : BehaviorSubject<fullPokemonData | null>= new BehaviorSubject<fullPokemonData | null>(null);
  public currentPokemon$ : Observable<fullPokemonData | null> = this.pokemonSelected$.asObservable();

  constructor(){
    this.initializePokemonList(); 
  }
  public get pokemonFullList(){return this.pokemon100List}

  public set putPokemon(pokemon:fullPokemonData){
    this.pokemonSelected$.next({...pokemon});
  }

  async initializePokemonList(){
    for (let id = 1; id <= this.maxNumber; id++) {
      const pokemon = await lastValueFrom(this.pokemonService.getPokemons(id));
      if(pokemon) this.pokemon100List.push(pokemon);        
    }
    // console.log('pokemon100List en team-selectServ:', this.pokemon100List);
  }
}
