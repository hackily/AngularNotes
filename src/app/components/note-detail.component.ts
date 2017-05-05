import { Component, Input, OnInit} from '@angular/core'; //Need these decorators.
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { NoteService } from '../services/note.service';
import { Note } from '../data/note';

//@Component decorator provides Angular metadata. CSS selector name will match the tag.
//Later, can add <note-detail> element to AppComponent template.
@Component({
  selector: 'note-detail',
  template: `
    <div *ngIf="note">
    <h2>{{note.name}} details!</h2>
    <div><label>id: </label>{{note.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="note.name" placeholder="name"/><br>
      <label>Note Contents</label>
      <textarea [(ngModel)]="note.content"></textarea>
    </div>
    <button (click)="goBack()">Back</button>
  </div>
  `,
  styleUrls: [ './note-detail.component.css' ]
})


export class NoteDetailComponent implements OnInit{
  @Input() note: Note; //For this to be an input property, it must be declared with the decorator;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  //switchMap maps id to new Observable
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.noteService.getNote(+params['id'])) //+ converts string to a number
      .subscribe(note => this.note = note);
  }

  goBack(): void {
    this.location.back(); //Navigates one step back in the browser's history stack, thanks to Location service
    //CanDeactivate guard to prevent users from leaving the app.
  }

}