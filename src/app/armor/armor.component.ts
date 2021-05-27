import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const _MAX = 11300;
const _EPIC = 1.25;

@Component({
  selector: 'app-armor',
  template: `
    <div class="content">
     <div class="armorcontent">
      <app-hero></app-hero>
      <a [routerLink]="['/maximums']"><img src="assets/armor{{epic?'E':''}}.png"></a>
      <form [formGroup]="options" novalidate>
        <div class="mat-form-field example-full-width marg">
          <mat-checkbox formControlName="purple" (change)="calc()">Armor is Epic/Legendary</mat-checkbox>
        </div>
        <mat-form-field class="example-full-width">
          <input matInput placeholder="Level" formControlName="level" type="number" (input)="calc()" min="5" max="50" onclick="this.select()">
        </mat-form-field>
        <mat-form-field class="example-full-width">
          <input matInput placeholder="Armor (max possible: {{max}})" formControlName="armor" type="number" (input)="calc()" min="0" max="100000" onclick="this.select()">
        </mat-form-field>
      </form>
      <p>Armor at level 50 (% of max):</p>
      <p class="big" *ngIf="!epic">Rare: {{maxarmor[0]}} ({{maxarmor[1]}}%)</p>
      <p class="big">Epic: {{maxarmor[2]}} ({{maxarmor[3]}}%)</p>
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
    .armorcontent{background-color:rgba(16,0,13,0.8); overflow: auto; height: calc(100% - 64px);}
  `]
})
export class ArmorComponent implements OnInit {
  options = new FormGroup({
    level: new FormControl(5),
    armor: new FormControl(),
    purple: new FormControl(false)
  });
  epic = false;
  max = 0;
  maxarmor = [0,0,0,0];
  
  constructor() { 
    this.options.controls['level'].setValue(localStorage.getItem('myLevel') || 5);
    this.options.controls['armor'].setValue(localStorage.getItem('myArmor') || 100);
    this.options.controls['purple'].setValue(localStorage.getItem('myEpic') === 'true');
  }

  ngOnInit(): void {
    this.calc();
  }

  calc() {
    const d = this.options.controls['armor'].value;
    const l = this.options.controls['level'].value;
    this.epic = this.options.controls['purple'].value;
    if (!d || !l) return;
    localStorage.setItem('myLevel', l);
    localStorage.setItem('myArmor', d);
    localStorage.setItem('myEpic', this.epic.toString());
    const armor = this.recurse(d, l);
    this.maxarmor = [Math.round(armor), Math.round(100*armor / _MAX), Math.round(armor * (this.epic?1:_EPIC)), Math.round(100*armor*(this.epic?1:_EPIC) / _MAX)];
    this.max = Math.round(_MAX * d / armor / (this.epic?1:_EPIC));
  }
  
  recurse(d: number, l: number) {
    if (l < 50) d = this.recurse(d * 1.10, l + 1);
    return d;
  }
}
