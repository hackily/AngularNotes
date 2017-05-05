import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from '../data/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'my-notes', //Selects the <app-root> element in index.html
  //templateUrl: './app.component.html', //Can use separate file, or inline template.
  
  styleUrls: ['./notes.component.css'],
  //styles: [``], //Styles can be inlined too! But they'll overwrite styleUrls.

  //* prefix in ngFor indicates the element and the children are a master template.
  //ngFor iterates over components, renders an instance of element per iteration.
  //Inline template for small ones?
  //Pipes are good for formatting strings, dates, data, etc.
  template: `
    <h2>My Notes!</h2>
    <ul class="notes">
      <li *ngFor="let note of notes" 
        [class.selected]="note === selectedNote"
        (click)="onSelect(note)" 
      >
        <span class="note-content">{{note.id}}</span> {{note.name}}
      </li>
    </ul>
    <div *ngIf="selectedNote">
      <h2>
        {{selectedNote.name | uppercase}} is my note
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
  `,
  //providers: [NoteService] //Tell injector how to create the NoteService - create a new instance when it creates component.
  //But creating it in module creates a singleton available throughout the module. Or in AppModule for the entire application
})

//Can contain both : or =
export class NotesComponent implements OnInit{
  title = 'AngularNotes';
  notes: Note[];
  selectedNote: Note; //Don't initialize, but provide its type.

  //Inject service in constructor.
  constructor(
    private noteService: NoteService,
    private router: Router){  }

  onSelect(note: Note): void {
    this.selectedNote = note;
  }
  getNotes(): void {
    this.noteService.getNotesAsync()
    .then((notes) => {
      this.notes = notes});
    }
  ngOnInit(): void {
    this.getNotes();
  }
  gotoDetail(): void {
    this.router.navigate(['/notes/detail', this.selectedNote.id]);
  }

  
}
