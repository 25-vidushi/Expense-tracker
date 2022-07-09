import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import { useAuthState } from 'react-firebase-hooks/auth';

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

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
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
    <div className='loginPage'>
<h1 className='tracker'>To tracker your expense 💵<br/> Sign in</h1>
<br/><br/>
<img className='google' src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"></img><button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
<br/><br/></div>
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
