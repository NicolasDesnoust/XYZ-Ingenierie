import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-easy-divider',
  template: `
    <div class="divider"><span></span><span>OU</span><span></span></div>
  `,
  styleUrls: ['./easy-divider.component.scss'],
})
export class EasyDividerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
