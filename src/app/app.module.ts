import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //NgModel lives here
import { HttpModule } from '@angular/http';

//import { RouterModule} from '@angular/router'; //Don't need this, present in app-routing.module
import { AppRoutingModule} from './app-routing.module';

//Imports for loading and configuring in-memory web apis
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

//Every component must be declared in AppModule
import { AppComponent } from './app.component';
import { PlanetsComponent } from './components/planets.component';
import { PlanetDetailComponent } from './components/planet-detail.component';
import { DashboardComponent } from './components/dashboard.component';
import { PlanetService } from './services/planet.service';

//TODO: Figure out what app.module does.
@NgModule({
  //Declarations contains a list of components, pipes, directives belonging to the module.
  //Components must be declared before other components can reference it.
  declarations: [
    AppComponent,
    PlanetsComponent,
    PlanetDetailComponent,
    DashboardComponent

  ],
  //Only module dependencies go in here.
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //Intent is to simulate XHR with an in-memory alternative
    //forRoot() takes a class, which will be used to prime the in-memory database.
    InMemoryWebApiModule.forRoot(InMemoryDataService), //TODO: Remove when actual service is provided
    AppRoutingModule //Order matters!

  ],
  providers: [PlanetService], //Appwide services should be registered here - so they're only created once.
  bootstrap: [AppComponent] //Creates the component and places it into the DOM, according to its selector
})
export class AppModule { }
