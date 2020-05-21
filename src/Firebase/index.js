import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAjzgVsWsh4AOwC5SvPFBlIZ5Tk4T-YWMc',
  authDomain: 'shopping-cart-e4874.firebaseapp.com',
  databaseURL: 'https://shopping-cart-e4874.firebaseio.com',
  projectId: 'shopping-cart-e4874',
  storageBucket: 'shopping-cart-e4874.appspot.com',
  messagingSenderId: '285517275012',
  appId: '1:285517275012:web:74425d1304e6466b1707d1',
  measurementId: 'G-SD3M6804NP'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
