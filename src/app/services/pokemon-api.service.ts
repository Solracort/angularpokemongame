import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fullPokemonData } from '../pages/interfaces/pokemon.interface';
import { Observable, map } from 'rxjs';
import { PokemonDescriptions } from '../pages/interfaces/pokemonDescriptions.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private url:string = 'https://pokeapi.co/api/v2/pokemon/';
  private description: string = 'https://pokeapi.co/api/v2/pokemon-species/'

  constructor(private http: HttpClient) { }

  getPokemons(id:number):Observable<fullPokemonData>{
    return  this.http.get<fullPokemonData>(`${this.url}${id}`);
  }
  getDescription(id:number):Observable<string>{
    return  this.http.get<PokemonDescriptions>(`${this.description}${id}`).pipe(
      map(data=>{
        const spanishFlavorTextEntry = data.flavor_text_entries.find(entry=>entry.language.name === 'es')

        if (spanishFlavorTextEntry) {
          return spanishFlavorTextEntry.flavor_text;
        } else {
          throw new Error('No se encontró el texto en español.');
        }
      })
    );
  }
}

