
import { Component, OnInit, inject } from '@angular/core';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { fullPokemonData } from '../interfaces/pokemon.interface';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  
  public pokemonService = inject(PokemonApiService);
  
  getPokemonType(pokemon: fullPokemonData): string | undefined {
    const firstType = pokemon?.types[0];
    return firstType ? firstType.type.name : undefined;
  }
}