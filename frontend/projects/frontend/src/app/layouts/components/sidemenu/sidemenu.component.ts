import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent implements OnInit {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menu$ = this.menu.getAll();
  buildRoute = this.menu.buildRoute;

  constructor(private menu: MenuService) {
  }
  ngOnInit(): void {
    this.menu$.pipe(tap((menu) => console.log(menu))).subscribe();
  }
}
