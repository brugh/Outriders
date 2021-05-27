import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArmorComponent } from './armor/armor.component';
import { HomeComponent } from './home/home.component';
import { MaxesComponent } from './maxes/maxes.component';
import { WeaponsComponent } from './weapons/weapons.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'maximums', component: MaxesComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'armor', component: ArmorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
