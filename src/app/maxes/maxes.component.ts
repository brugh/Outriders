import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maxes',
  template: `
    <div class="content">
     <div class="maxescontent">
      <app-hero></app-hero>
      <table (panup)="handlePan($event)" (panstart)="getLevel()" (panend)="getLevel()" (pandown)="handlePan($event)" (wheel)="handleWheel($event)">
        <tr>
          <th><a [routerLink]="['/weapons']"><img src="assets/weapon{{epic?'E':''}}.png"></a></th>
          <th class="vertical">LEVEL</th>
          <th><a [routerLink]="['/armor']"><img src="assets/armor{{epic?'E':''}}.png"></a></th>
        </tr>
        <tr><td colspan="3">
          <div class="mat-form-field example-full-width marg">
            <mat-checkbox [checked]='epic' (change)="calc($event)">Armor is Epic/Legendary</mat-checkbox>
          </div>
        </td></tr>
        <tr><td colspan="3"><button (click)="l(-1)"><i class="arrow up"></i></button></td></tr>
        <tr *ngFor='let r of rows' [class.current]="r.level === level">
          <ng-container *ngIf="level - r.level < 4 && r.level - level < 4 || (r.level < 12 && level < 8) || (r.level > 43 && level > 46)">
          <td *ngIf="!this.epic">{{r.weapon}}</td>
          <td *ngIf="this.epic">{{r.weaponE}}</td>
          <td>{{r.level}}</td>
          <td *ngIf="!this.epic">{{r.armor}}</td>
          <td *ngIf="this.epic">{{r.armorE}}</td>
          </ng-container>
        </tr>
        <tr><td colspan="3"><button (click)="l(1)"><i class="arrow down"></i></button></td></tr>
      </table>
     </div>
    </div>
  `,
  styleUrls: ['maxes.component.scss']
})
export class MaxesComponent implements OnInit {
  epic = false;
  level = 5;
  prepan = 0;
  panadd = 0;
  rows: { level: number, weapon: number, weaponE: number, armor: number, armorE: number }[] = [];

  constructor() {
    this.level = parseInt(localStorage.getItem('myLevel') || '5');
    this.epic = localStorage.getItem('myEpic') === 'true';
  }

  ngOnInit(): void {
    for (let l = 5, w = 230.21, a = 155.03; l <= 50; l++) {
      this.rows.push({ level: l, weapon: Math.round(w / 1.05), weaponE: Math.round(w), armor: Math.round(a / 1.25), armorE: Math.round(a) });
      w = this.inc(w, l);
      a = a * 1.1;
    }
  }

  calc($event: any) {
    this.epic = $event.checked;
    localStorage.setItem('myLevel', this.level.toString());
    localStorage.setItem('myEpic', this.epic.toString());
  }

  inc(d: number, l: number) {
    if (l <= 20) return d * 1.128;
    if (l > 20 && l <= 30) return d * 1.204;
    if (l > 30 && l <= 40) return d * 1.104;
    return d * 1.155;
  }

  l(l: number) {
    if (this.level + l >= 5 && this.level + l <= 50) this.level = this.level + l
    localStorage.setItem('myLevel', this.level.toString());
  }

  handlePan(event: any) {
    if (this.panadd === 0) this.prepan = this.level;
    const add = Math.round(event.deltaY / 20);
    if (this.prepan + add >= 5 && this.prepan + add <= 50) this.panadd = add;
    this.level = this.prepan + this.panadd;
    localStorage.setItem('myLevel', this.level.toString());
  }

  handleWheel(event: any) {
    this.l(Math.sign(event.deltaY));
  }

  getLevel() {
    this.panadd = 0;
    this.prepan = this.level;
  }

}

