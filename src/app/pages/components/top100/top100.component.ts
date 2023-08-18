import { Component, NgModule, OnInit, inject } from '@angular/core';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { fullPokemonData } from '../../interfaces/pokemon.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'top100',
  templateUrl: './top100.component.html',
  imports:[MaterialModule, CommonModule, RouterModule],
  styleUrls: ['./top100.component.css']
})
export class Top100Component implements OnInit {
    
    public pokemonService = inject(PokemonApiService);
    public pokemonCards: { id: number, pokemon: fullPokemonData | null, description: string }[] = [];
  
    ngOnInit(): void {
      for (let id = 1; id <= 100; id++) {
        this.getPokemonfromAPI(id);
      }
    }
  
    getPokemonfromAPI(id: number): void {
      this.pokemonService.getPokemons(id).subscribe((pokemon) => {
        if (pokemon!= null) {
          this.pokemonCards.push({ id, pokemon: pokemon, description: '' });
        }
      });
  
      this.pokemonService.getDescription(id).subscribe(
        d => {
          const card = this.pokemonCards.find(c => c.id === id);
          if (card) {
            card.description = d;
          }
        }
      );
    }
    getPokemonType(pokemon: fullPokemonData): string | undefined {
      const firstType = pokemon?.types[0];
      return firstType ? firstType.type.name : undefined;
    }
}



