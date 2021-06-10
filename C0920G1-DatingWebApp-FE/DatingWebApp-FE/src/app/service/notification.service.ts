import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {snapshotToArray} from "../chat/roomlist/roomlist.component";
import {TokenService} from "../security/login-service/token.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messagingFirebase: firebase.messaging.Messaging;
  notifications = [];
  id: any;
  constructor(
    private token: TokenService,
  ) {
    if (token.getUser() != null){
      this.id = token.getUser().id;
    }
  }

  addNewNotification(form: any, idTo: number) {
    firebase.initializeApp(environment.firebaseConfig);
    this.messagingFirebase = firebase.messaging();
    const notification = form;
    notification.idTo = idTo;
    const newNotification = firebase.database().ref('notification/').push();
    console.log(notification);
    newNotification.set(notification);
  }

  private messagingObservable = new Observable( observe => {
    this.messagingFirebase.onMessage(payload => {
      observe.next(payload)
    })
  });

  receiveMessage() {
    return this.messagingObservable;
  }
}
