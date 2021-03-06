import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

const configFirebase: any = {
  apiKey: 'AIzaSyCjeY_VoS8jS_ynr5Rdf0TIW3wWErh9wn8',
  authDomain: '',
  databaseURL: ' ',
  projectId: 'skyvision-31445',
  storageBucket: 'skyvision-31445.appspot.com',
  messagingSenderId: '828391910441'
};

@Injectable()
export class FirebaseService {
  config: any;

  constructor() {
    this.init();
  }

  init() {
    firebase.default.initializeApp(configFirebase);
    this.config = {
      currentRoute: ''
    };
  }

  registerUser(credentials: any) {
    return firebase.default.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  updateUser(user: any, name: any) {
    user.updateProfile({
      displayName: name,
      photoURL: null
    }).then(() => {
      console.log('Update successful.');
    }, (_error: any) => {
      console.log('// An error happened.');
    });
  }

  passwordAuthProvider(credentials: any) {
    return firebase.default.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  googleAuthProvider() {
    return firebase.default.auth().signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }

  rememberPassword(email: any) {
    return firebase.default.auth().sendPasswordResetEmail(email);
  }

  logout() {
    return firebase.default.auth().signOut();
  }

  setIsLogged(value: any): void {
    localStorage.setItem('isLogged', JSON.stringify(value));
  }

  getIsLogged(): boolean {
    return  JSON.parse(localStorage.getItem('isLogged'));
  }

  setIsBack(value: any) {
    localStorage.setItem('isBack', JSON.stringify(value));
  }

  getIsBack(): boolean {
    return  JSON.parse(localStorage.getItem('isBack'));
  }

  // global states store

  setConfig(prop: any, value: any): void {
    this.config[prop] = value;
  }

  getConfig(): any {
    return this.config;
  }

}
