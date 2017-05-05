import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { NotesComponent } from './components/notes.component';
import { NoteDetailComponent } from './components/note-detail.component';

//No declarations - that's the responsibility of companion module.
//If guard services exist, Routing Module adds module 'providers'

//Pull routes into a variable, clarifies the pattern.
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/detail/:id', component: NoteDetailComponent },
  { path: 'dashboard', component: DashboardComponent }
]

//Imports and exports, so components have access to Router declarables. 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {};

