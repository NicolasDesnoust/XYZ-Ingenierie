import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-content',
  template: `
    <div class="card-content">
      <div class="content">
        <div class="name">{{ name }}</div>

        <div class="subinfo">{{ subinfo }}</div>
        <div class="subinfo">{{ subinfo2 }}</div>
        <div class="subinfo">{{ subinfo3 }}</div>
        <div class="subinfo">{{ subinfo4 }}</div>
        <div class="subinfo">{{ subinfo5 }}</div>
      </div>
    </div>
  `,
})
export class CardContentComponent implements OnInit {
  @Input() name = '';
  @Input() subinfo = '';
  @Input() subinfo2 = '';
  @Input() subinfo3 = '';
  @Input() subinfo4 = '';
  @Input() subinfo5 = '';

  ngOnInit(): void {}
}
