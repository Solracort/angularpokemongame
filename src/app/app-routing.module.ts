import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { BattleComponent } from './pages/battle/battle.component';

const routes: Routes = [
  {path: '', component: LayoutComponent},
  {path: 'team', 
   loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule) },
  {path: 'top100',
  loadComponent:()=>import('./pages/components/top100/top100.component').then(m=>m.Top100Component) },
  {path: '**', redirectTo:'team'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
