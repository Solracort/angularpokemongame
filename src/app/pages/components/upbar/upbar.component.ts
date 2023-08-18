import { Component, inject } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'upbar',
  templateUrl: './upbar.component.html',
  styleUrls: ['./upbar.component.css']
})
export class UpbarComponent {

  public menuService = inject(MenuService);


  showSideBarMenu(){
    this.menuService.hide$.next(!this.menuService.hide$.value);
  }
}
