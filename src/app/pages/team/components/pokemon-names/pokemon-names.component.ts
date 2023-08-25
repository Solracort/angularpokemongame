import { Component, inject } from '@angular/core';
import { fullPokemonData } from 'src/app/pages/interfaces/pokemon.interface';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { TeamSelectionService } from 'src/app/services/team-selection.service';

@Component({
  selector: 'pokemon-names',
  templateUrl: './pokemon-names.component.html',
  styleUrls: ['./pokemon-names.component.css']
})
export class PokemonNamesComponent {
  
  private teamSelectionService = inject(TeamSelectionService);
  private screenSize = inject(ScreenSizeService)

  public pokemon100List : fullPokemonData[] = [];
  public   isTableVisible = false; 
  public colsTable : number = 0;

  ngOnInit(): void {
    this.pokemon100List = this.teamSelectionService.pokemonFullList;
    this.screenSize.observeScreenSize((isSmall, isMedium, isLarge, isXLarge) => {
      if (isSmall) {
        this.colsTable = 3;
        console.log('Tamaño de pantalla: Small');
      }
      if (isMedium) {
        this.colsTable = 4;
        console.log('Tamaño de pantalla: Medium');
      }
      if (isLarge) {
        console.log('Tamaño de pantalla: Large');
        this.colsTable=8;
      }
      if (isXLarge) {
        this.colsTable = 10;
        console.log('Tamaño de pantalla: XLarge');
      }
    });
  }
  showPokemonDetailed(pokemon:fullPokemonData){
    this.teamSelectionService.putPokemon = pokemon;
  }
  toggleTable(){
    this.isTableVisible = !this.isTableVisible;
  }
}
