import { Component, Input } from '@angular/core'; //Need these decorators.
import { Note } from './note';

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
      <textarea [(ngModel)]="note.content"></textarea>
    </div>
  </div>
  `
})


export class NoteDetailComponent {
  @Input() note: Note; //For this to be an input property, it must be declared with the decorator;


}