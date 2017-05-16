import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Planet } from '../data/planet';
import { NOTES } from '../data/mock-planets';
//Decorator to deplanet that this service can be injected. Never forget the parenthesis!
//This tells Typescript to provide metadata... that other dependencies may be needed.
//Not necessarily needed, but future proofs it. Good practice to always include it.
@Injectable()
export class PlanetService{
  private planetsUrl = 'api/planets'; //TODO: Fix when a data source is had.
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getPlanet(id: number): Promise<Planet> {
    const url = `${this.planetsUrl}/${id}`; //Holy crap backticks are needed, not single quotes.
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Planet)
      .catch(this.handleError);
  }
  getPlanetsAsync(): Promise<Planet[]> { //Would get data somewhere. Web service, local storage, mock data source.
    //http.get returns an RxJS Observable, so we convert it into a Promise.
    return this.http.get(this.planetsUrl)
      .toPromise()
      .then(response => response.json().data as Planet[])
      .catch(this.handleError);
  };
  
  create(name: string): Promise<Planet> {
    return this.http
      .post(this.planetsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Planet)
      .catch(this.handleError);
  }

  //Take a planet, return a promise that will return a Planet
  update(planet: Planet): Promise<Planet> {
    const url = `${this.planetsUrl}/${planet.id}`;
    return this.http
      .put(url, JSON.stringify(planet), {headers: this.headers})
      .toPromise()
      .then(() => planet)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.planetsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error has occured', error); //TODO: Log this when a logging service exists. Also gracefully fallback when no response is returned.
    return Promise.reject(error.message || error);
  }
}