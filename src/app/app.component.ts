import { Component, OnInit } from '@angular/core';
import { Note } from './data/note';
import { NoteService } from './services/note.service';


@Component({
  selector: 'app-root', //Selects the <app-root> element in index.html
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css'],
  //styles: [``], //Styles can be inlined too! But they'll overwrite styleUrls.

  //* prefix in ngFor indicates the element and the children are a master template.
  //ngFor iterates over components, renders an instance of element per iteration.
  template: `
    <h1>{{title}}</h1>
    <h2>My Notes!</h2>
    <ul class="notes">
      <li *ngFor="let note of notes" 
        [class.selected]="note === selectedNote"
        (click)="onSelect(note)" 
      >
        <span class="note-content">{{note.id}}</span>{{note.name}}
      </li>
    </ul>
    <note-detail [note]="selectedNote"></note-detail>
  `,
  providers: [NoteService] //Tell injector how to create the NoteService - create a new instance when it creates component.
  //Why not in module though?
})

//Can contain both : or =
export class AppComponent implements OnInit{
  //Inject service in constructor.
  constructor(private noteService: NoteService){
  }
  title = 'AngularNotes';
  notes: Note[];
  selectedNote: Note; //Don't initialize, but provide its type.
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

  
}
