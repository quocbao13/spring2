import { Component } from '@angular/core';
import * as firebase from 'firebase';

// const config= {
//   apiKey: 'AIzaSyC7YhXEJ-euML6ITBBmcOVLTI_9cRKfE7s',
//   databaseURL: 'https://preproject-f8620-default-rtdb.firebaseio.com'
// };
const firebaseConfig = {
  apiKey: "AIzaSyB7plWsoqUes8_Lgsb3nqjZ4NnlbDLwXyU",
  authDomain: "car-insurace-image.firebaseapp.com",
  databaseURL: "https://car-insurace-image-default-rtdb.firebaseio.com",
  projectId: "car-insurace-image",
  storageBucket: "car-insurace-image.appspot.com",
  messagingSenderId: "394414464184",
  appId: "1:394414464184:web:646cf366cae02ec237684d",
  measurementId: "G-WB7CE3EJF8"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DatingWebApp-FE';
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}
