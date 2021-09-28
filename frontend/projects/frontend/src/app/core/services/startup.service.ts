import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private menuReq$ = this.http.get('assets/data/menu.json');

  constructor(private menu: MenuService, private http: HttpClient) {}

  /** Load the application only after get the menu or other essential informations such as roles and permissions. */
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.menuReq$.subscribe((response: any) => {
        this.menu.addNamespace(response.menu, 'menu');
        this.menu.set(response.menu);
        resolve(null);
      });
    });
  }
}
