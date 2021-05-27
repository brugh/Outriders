import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const _MAX = 99600;
const _EPIC = 1.05;

@Component({
  selector: 'app-weapons',
  template: `
  <div class="content">
   <div class="weaponcontent">
    <app-hero></app-hero>
    <a [routerLink]="['/maximums']"><img src="assets/weapon{{epic?'E':''}}.png"></a>
    <form [formGroup]="options" novalidate>
      <div class="mat-form-field example-full-width marg">
        <mat-checkbox formControlName="purple" (change)="calc()">Weapon is Epic/Legendary</mat-checkbox>
      </div>
      <mat-form-field class="example-full-width">
        <input matInput placeholder="Level" formControlName="level" type="number" (input)="calc()" min="5" max="50" onclick="this.select()">
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <input matInput placeholder="Damage (possible max: {{ max }})" formControlName="damage" type="number" (input)="calc()" min="0" max="100000" onclick="this.select()">
      </mat-form-field>
    </form>
    <p>Damage at level 50 (% of max):</p>
    <p class="big" *ngIf="!epic">Rare: {{maxdamage[0]}} ({{maxdamage[1]}}%)</p>
    <p class="big">Epic: {{maxdamage[2]}} ({{maxdamage[3]}}%)</p>
   </div>
  </div>
  `,
  styles: [`
    form{width:240px;margin:35px auto 32px;display:block;float:none;}
    .marg{margin-bottom:12px;}
    .mat-form-field{width:100%;}
    .misc-bottom-padding{margin:8px 0 20px;}
    .misc-bottom-padding mat-label{margin-right:15px;}
    .mat-radio-label{margin:0 15px 0 0;}
    .title-center{margin:0 auto;}
    .button-wrapper{margin-top:10px;}
    .big{font-size:6vw;padding-top:12px; margin-top:2vw; margin-bottom: 4vw;}
    .weaponcontent{background-color:rgba(16,0,13,0.8); overflow:auto; height: calc(100vh - 64px);}
  `]
})
export class WeaponsComponent implements OnInit {
  options = new FormGroup({
    level: new FormControl(5),
    damage: new FormControl(),
    purple: new FormControl(false)
  });
  epic = false;
  max = 0;
  maxdamage = [0,0,0,0];

  constructor() {
    this.options.controls['level'].setValue(localStorage.getItem('myLevel') || 5);
    this.options.controls['damage'].setValue(localStorage.getItem('myDamage') || 100);
    this.options.controls['purple'].setValue(localStorage.getItem('myEpic') === 'true');
  }

  ngOnInit(): void {
    this.calc();
  }

  calc() {
    const d = this.options.controls['damage'].value;
    const l = this.options.controls['level'].value;
    this.epic = this.options.controls['purple'].value;
    if (!d || !l) return;
    localStorage.setItem('myLevel', l);
    localStorage.setItem('myDamage', d);
    localStorage.setItem('myEpic', this.epic.toString());
    const dmg = this.recurse(d, l);
    this.maxdamage = [Math.round(dmg), Math.round(100*dmg / _MAX), Math.round(dmg * (this.epic?1:_EPIC)), Math.round(100*dmg*(this.epic?1:_EPIC) / _MAX)];
    this.max = Math.round(_MAX * d / dmg / (this.epic?1:_EPIC));
  }

  recurse(d: number, l: number) {
    if (l <= 20) d = this.recurse(d * 1.128, l + 1);
    if (l > 20 && l <= 30) d = this.recurse(d * 1.204, l + 1);
    if (l > 30 && l <= 40) d = this.recurse(d * 1.104, l + 1);
    if (l > 40 && l < 50) d = this.recurse(d * 1.155, l + 1);
    return d;
  }
}
