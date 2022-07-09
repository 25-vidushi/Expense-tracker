import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// import { auth } from "./firebase_config";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import './App.css';

firebase.initializeApp({
  apiKey: "AIzaSyBW8mUX4c4VpGEmlkTgo6mYWLpfaTOxz6U",
  authDomain: "expense-tracker-d6dd2.firebaseapp.com",
  projectId: "expense-tracker-d6dd2",
  storageBucket: "expense-tracker-d6dd2.appspot.com",
  messagingSenderId: "809053638637",
  appId: "1:809053638637:web:6948a4eb79f8fa6506e1e4",
  measurementId: "G-BQ37V4ZHRH"
})

const auth = firebase.auth();

function App() {

  // const register = async () => {

  // };
  
  // const login = async () => {
  
  // };
  
  // const logout = async () => {
    
  // };
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <Tracker /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Tracker() {
  return(
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  )
  }
export default App;
