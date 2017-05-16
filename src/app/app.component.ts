import { Component } from '@angular/core';


//RouterLink directive is a string telling router where to navigate. Router then outputs at 'router-outlet'
@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/planets" routerLinkActive="active">Planets</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ './app.component.css' ]
})

export class AppComponent{
  title = "Planets!"
}