import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamComponent } from './team/team.component';
import { Top100Component } from './components/top100/top100.component';
import { BattleComponent } from './battle/battle.component';
import { LayOutTeamComponent } from './team/components/lay-out-team/lay-out-team.component';

const routes: Routes = [{
    path:'', 
    component:LayOutTeamComponent,
    children: [
      { path: 'battle' ,    component: BattleComponent},
      { path: 'top100',     component: Top100Component  },
      { path: 'selection' , component: TeamComponent},
      { path: '**'         , redirectTo: 'top100'},
    ]  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
