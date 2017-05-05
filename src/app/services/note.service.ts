import { Injectable } from '@angular/core';

import { Note } from '../data/note';
import { NOTES } from '../data/mock-notes';
//Decorator to denote that this service can be injected. Never forget the parenthesis!
//This tells Typescript to provide metadata... that other dependencies may be needed.
//Not necessarily needed, but future proofs it. Good practice to always include it.
@Injectable()
export class NoteService{
  getNote(id: number): Promise<Note> {
    return this.getNotesAsync()
      .then(notes => notes.find(note => note.id === id));
  }
  getNotesAsync(): Promise<Note[]> { //Would get data somewhere. Web service, local storage, mock data source.
    return new Promise((resolve) => {
      resolve(NOTES);
    })
  }; 
  getNotesSimulate(): Promise<Note[]> {
    return new Promise((resolve) => {
      setTimeout(()=> resolve(this.getNotesAsync()), 2000);
    })
  }
}