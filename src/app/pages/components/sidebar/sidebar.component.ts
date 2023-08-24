import { Component } from '@angular/core';

interface MenuItem {
  name: string; 
  route: string; 
}

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public menuItems: MenuItem[]=[
    { route: '/top100', name: 'Top 100'},
    { route: '/team/selection', name: 'Elegir Equipo'},
    { route: '',    name: '...'},   
  ]

  
}
