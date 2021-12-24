import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PinkyHerbalGarden';


  constructor() {
    initializeApp(environment.firebaseConfig);
    console.log("Firebase App Initialised");

  }
}
