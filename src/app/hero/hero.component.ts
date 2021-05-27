import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
  <div class="content">
    <a [routerLink]="['/']"><img src="assets/logo.png"></a>
  </div>
  `,
  styles: [
    'img { margin: 48px 0; }'
  ]
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
