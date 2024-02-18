import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {

  constructor() { }

  // returns a single reference to the DOM window object
  getNativeWindow() {
    return window;
 }
}
