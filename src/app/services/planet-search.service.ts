import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Planet } from '../data/planet';

@Injectable()
export class PlanetSearchService {
	constructor(private http: Http) {}

	search(term: string): Observable<Planet[]>{
		return this.http
			.get(`app/planets/?name=${term}`) //Directly get the observable
			.map( response => response.json().data as Planet[]); //Chain to RxJS operator map()
			
	}
}