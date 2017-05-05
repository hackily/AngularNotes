import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //NgModel lives here
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { AppRoutingModule} from './app-routing.module';

//Every component must be declared in AppModule
import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes.component';
import { NoteDetailComponent } from './components/note-detail.component';
import { DashboardComponent } from './components/dashboard.component';
import { NoteService } from './services/note.service';

//TODO: Figure out what app.module does.
@NgModule({
  //Declarations contains a list of components, pipes, directives belonging to the module.
  //Components must be declared before other components can reference it.
  declarations: [
    AppComponent,
    NotesComponent,
    NoteDetailComponent,
    DashboardComponent

  ],
  //Only module dependencies go in here.
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [NoteService],
  bootstrap: [AppComponent] //Creates the component and places it into the DOM, according to its selector
})
export class AppModule { }
