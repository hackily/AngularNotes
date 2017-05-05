import { Component } from '@angular/core';
import { Note } from './components/note';

const NOTES: Note[] = [
  { id: 1, name: 'Note 1', content: 'Do not microwave forks'},
  { id: 2, name: 'Note 2', content: 'Kale is very healthy for you'},
  { id: 3, name: 'Note 3', content: 'Buy whole fat milk'},
  { id: 4, name: 'Note 4', content: 'Get more sleep'},
  { id: 5, name: 'Note 5', content: 'Call from RedIndustries at 5pm'},
  { id: 6, name: 'Note 6', content: 'Feed the cat at 6pm'},
  { id: 7, name: 'Note 7', content: 'Europe trip on 6/30!!!'},
  { id: 8, name: 'Note 8', content: 'Contact Uber customer support to fix app'},
  { id: 9, name: 'Note 9', content: '1 large potato, 2tbsp butter, salt'},
  { id: 10, name: 'Note 10', content: 'Zucchini on sale at Kroger!!! 99c/lb'}
]

@Component({
  selector: 'app-root', //Selects the <app-root> element in index.html
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css'],
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .notes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
    }
    .notes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .notes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .notes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .notes .text {
      position: relative;
      top: -3px;
    }
    .notes .note-content {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],

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

  //
  //Backticks instead of single quotes for multiline
  //Double curly braces are interpolation binding syntax... Presents the variables as strings.
})

//Can contain both : or =
export class AppComponent {
  title = 'AngularNotes';
  notes = NOTES;
  selectedNote: Note; //Don't initialize, but provide its type.
  onSelect(note: Note): void {
    this.selectedNote = note;
  }
  
}
