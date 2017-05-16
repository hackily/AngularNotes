import { Component, Input, OnInit} from '@angular/core'; //Need these decorators.
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../data/planet';

//@Component decorator provides Angular metadata. CSS selector name will match the tag.
//Later, can add <planet-detail> element to AppComponent template.
@Component({
  selector: 'planet-detail',
  template: `
    <div *ngIf="planet">
    <h2>{{planet.name}} details!</h2>
    <div><label>id: </label>{{planet.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="planet.name" placeholder="name"/><br>
      <label>Planet Contents</label>
      <textarea [(ngModel)]="planet.content"></textarea>
    </div>
    <button (click)="save()">Save</button>
    <button (click)="goBack()">Back</button>
  </div>
  `,
  styleUrls: [ './planet-detail.component.css' ]
})


export class PlanetDetailComponent implements OnInit{
  @Input() planet: Planet; //For this to be an input property, it must be declared with the decorator;

  constructor(
    private planetService: PlanetService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  //switchMap maps id to new Observable
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.planetService.getPlanet(+params['id'])) //+ converts string to a number
      .subscribe(planet => this.planet = planet);
  }
  save(): void {
    this.planetService.update(this.planet)
      .then(() => this.goBack()); //After saving, send the user back.
  }
  goBack(): void {
    this.location.back(); //Navigates one step back in the browser's history stack, thanks to Location service
    //CanDeactivate guard to prevent users from leaving the app.
  }

}