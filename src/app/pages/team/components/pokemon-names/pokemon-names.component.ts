import { Component, inject } from '@angular/core';
import { fullPokemonData } from 'src/app/pages/interfaces/pokemon.interface';
import { TeamSelectionService } from 'src/app/services/team-selection.service';

@Component({
  selector: 'pokemon-names',
  templateUrl: './pokemon-names.component.html',
  styleUrls: ['./pokemon-names.component.css']
})
export class PokemonNamesComponent {
  
  private teamSelectionService = inject(TeamSelectionService);
  public pokemon100List : fullPokemonData[] = [];

  ngOnInit(): void {
    this.pokemon100List = this.teamSelectionService.pokemonFullList;
  }
  showPokemonDetailed(pokemon:fullPokemonData){
    this.teamSelectionService.putPokemon = pokemon;
  }
}
