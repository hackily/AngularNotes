import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Planet } from '../data/planet';
import { PlanetService } from '../services/planet.service';

@Component({
  selector: 'my-planets', //Selects the <app-root> element in index.html
  //templateUrl: './app.component.html', //Can use separate file, or inline template.
  
  styleUrls: ['./planets.component.css'],
  //styles: [``], //Styles can be inlined too! But they'll overwrite styleUrls.

  //* prefix in ngFor indicates the element and the children are a master template.
  //ngFor iterates over components, renders an instance of element per iteration.
  //Inline template for small ones?
  //Pipes are good for formatting strings, dates, data, etc.
  template: `
    <h2>My Planets!</h2>
    <div>
      <label>Planet Name:</label> <input #planetName />
      <button (click)="addPlanet(planetName.value); planetName.value=''">Add</button>
    </div>
    <ul class="planets">
      <li *ngFor="let planet of planets" 
        [class.selected]="planet === selectedPlanet"
        (click)="onSelect(planet)" 
      >
        <span class="planet-content">{{planet.id}}</span> {{planet.name}}
        <button class="delete" (click)="deletePlanet(planet); $event.stopPropagation()">x</button>
      </li>
    </ul>
    <div *ngIf="selectedPlanet">
      <h2>
        {{selectedPlanet.name | uppercase}} is my planet
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
  `,
  //providers: [PlanetService] //Tell injector how to create the PlanetService - create a new instance when it creates component.
  //But creating it in module creates a singleton available throughout the module. Or in AppModule for the entire application
})

//Can contain both : or =
export class PlanetsComponent implements OnInit{
  title = 'AngularPlanets';
  planets: Planet[];
  selectedPlanet: Planet; //Don't initialize, but provide its type.

  //Inject service in constructor.
  constructor(
    private planetService: PlanetService,
    private router: Router){  }

  onSelect(planet: Planet): void {
    this.selectedPlanet = planet;
  }
  getPlanets(): void {
    this.planetService.getPlanetsAsync()
    .then((planets) => {
      this.planets = planets});
    }
  ngOnInit(): void {
    this.getPlanets();
  }
  gotoDetail(): void {
    this.router.navigate(['/planets/detail', this.selectedPlanet.id]);
  }

  addPlanet(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.planetService.create(name)
      .then(planet => {
        this.planets.push(planet);
        this.selectedPlanet = null;
      })
  }

  deletePlanet(planet: Planet): void {
    this.planetService
      .delete(planet.id)
      .then(() => {
        this.planets = this.planets.filter(p => p !== planet); //Filters for planet, removes it.
        if (this.selectedPlanet === planet) {
          this.selectedPlanet = null; //If planet was selected, reset the selection.
        }
      });
  }
  
}
