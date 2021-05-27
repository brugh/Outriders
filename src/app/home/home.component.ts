import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="content">
      <a [routerLink]="['/maximums']" title="Maximums per level"><img src="assets/logo.png" class="center shadow inc"></a>
      <a [routerLink]="['/weapons']"><img src="assets/weapon.png" class="center top hover"></a>
      <a [routerLink]="['/armor']"><img src="assets/armor.png" class="center bottom hover"></a>
    </div>
  `,
  styles: [`
    .hover:hover {
      border-color: #f4f4f4 !important;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .9);
      transition: border-color .167s linear, box-shadow .167s linear;
    }
    .top { top: 25%; }
    .bottom { top: 75%; }
    .inc { width: 80%; }
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
