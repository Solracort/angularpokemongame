import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public hide$ : BehaviorSubject<boolean> = new BehaviorSubject(true);
}
