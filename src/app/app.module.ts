import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //NgModel lives here
import { HttpModule } from '@angular/http';

//Every component must be declared in AppModule
import { AppComponent } from './app.component';
import { NoteDetailComponent } from './components/note-detail.component';


//TODO: Figure out what app.module does.
@NgModule({
  //Declarations contains a list of components, pipes, directives belonging to the module.
  //Components must be declared before other components can reference it.
  declarations: [
    AppComponent,
    NoteDetailComponent 

  ],
  //Only module dependencies go in here.
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent] //Creates the component and places it into the DOM, according to its selector
})
export class AppModule { }
