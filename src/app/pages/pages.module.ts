import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { Top100Component } from './components/top100/top100.component';
import { MaterialModule } from '../material/material.module';
import { PokemonNamesComponent } from './team/components/pokemon-names/pokemon-names.component';
import { PokemonDetailsComponent } from './team/components/pokemon-details/pokemon-details.component';
import { TeamComponent } from './team/team.component';
import { BattleComponent } from './battle/battle.component';
import { LayOutTeamComponent } from './team/components/lay-out-team/lay-out-team.component';



@NgModule({
  declarations: [
    PokemonNamesComponent,
    PokemonDetailsComponent,
    TeamComponent,
    BattleComponent,
    LayOutTeamComponent,
  ],
  imports: [
    CommonModule, 
    PagesRoutingModule, 
    HttpClientModule,   
    Top100Component,
    MaterialModule,
  ]
})
export class PagesModule { }
