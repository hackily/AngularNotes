import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { PlanetsComponent } from './components/planets.component';
import { PlanetDetailComponent } from './components/planet-detail.component';

//No declarations - that's the responsibility of companion module.
//If guard services exist, Routing Module adds module 'providers'

//Pull routes into a variable, clarifies the pattern.
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'planets', component: PlanetsComponent },
  { path: 'planets/detail/:id', component: PlanetDetailComponent },
  { path: 'dashboard', component: DashboardComponent }
]

//Imports and exports, so components have access to Router declarables. 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {};

