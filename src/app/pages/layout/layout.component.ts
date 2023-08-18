import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit , OnDestroy{
  
  public menuService = inject(MenuService);
  public hide : boolean = false;

  
  
  ngOnInit(): void {
    this.menuService.hide$.subscribe(hide => this.hide = hide)
  }

    
  ngOnDestroy(): void {
    this.menuService.hide$.complete
  }
}
