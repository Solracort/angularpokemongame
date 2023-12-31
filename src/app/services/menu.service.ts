import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public hide$ : BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private breakpointObserver: BreakpointObserver) { }

  observeScreenSize(callback: (isSmall: boolean, isMedium: boolean, isLarge: boolean, isXLarge: boolean) => void): void {
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      callback(
        result.breakpoints[Breakpoints.Small],
        result.breakpoints[Breakpoints.Medium],
        result.breakpoints[Breakpoints.Large],
        result.breakpoints[Breakpoints.XLarge]
      );
    });
  }
}
