import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from '@firebase/app';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  app: FirebaseApp = initializeApp(environment.firebaseConfig);

  constructor( ) { }
}
