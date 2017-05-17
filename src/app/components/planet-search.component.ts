import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

//Observable class extention
import 'rxjs/add/observable/of';

//Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { PlanetSearchService } from '../services/planet-search.service';
import { Planet } from '../data/planet';

@Component({
	selector: 'planet-search',
	//Nothing can be done with an observable until it is routed through the 'async' pipe. The pipe subscribes to the Observable, and creates an array of planets.
	template: `
		<div id="search-component">
		<h4>Planet Search</h4>
		<input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
		<div>
			<div *ngFor="let planet of planets | async"
					(click)="gotoDetail(planet)" class="search-result" >
				{{planet.name}}
			</div>
		</div>
	</div>`,
	styles: [`
		.search-result{
			border-bottom: 1px solid gray;
			border-left: 1px solid gray;
			border-right: 1px solid gray;
			width:195px;
			height: 16px;
			padding: 5px;
			background-color: white;
			cursor: pointer;
		}
		.search-result:hover {
			color: #eee;
			background-color: #607D8B;
		}
		#search-box{
			width: 200px;
			height: 20px;
		}`],
		providers: [PlanetSearchService],
})

export class PlanetSearchComponent implements OnInit {
	planets: Observable<Planet[]>;
	private searchTerms = new Subject<string>(); //Subject produces an observable event stream - in this case, an Observable of strings

	constructor(
		private planetSearchService: PlanetSearchService,
		private router: Router
	) {}

	search(term: string): void {
		this.searchTerms.next(term); //Each call to search puts a new string into the observable stream via next()
	}

	ngOnInit(): void {
		this.planets = this.searchTerms //Subject is also an observable. We convert the stream of search terms into stream of Planet arrays, then assign to the planets property.
			.debounceTime(300)	//300ms after keystroke to consider term
			.distinctUntilChanged() //Ignore until term is different
			.switchMap(term => term //Switch to new observable whenever term changes
				? this.planetSearchService.search(term)	//return the observable if term exists
				: Observable.of<Planet[]>([]) //Otherwise, empty Observable if there was no term
			)
			.catch(error => {
				console.log(error); //TODO: Error handle when connected
				return Observable.of<Planet[]>([]); //Return empty Observable, an error occurred.
			})
	}

	gotoDetail(planet: Planet): void {
		let link = ['./planets/detail', planet.id];
		this.router.navigate(link);
	}
}
