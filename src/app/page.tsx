'use client'

import Image from "next/image";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {db, initFirebase} from "../../firebase"
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth"
import { error } from "console";

initFirebase();
const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function Home() {

  const [user, loading] = useAuthState(auth);

  const handleLogin = async () => {
    try{
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in: ",result.user)
    } catch(error) {
      console.error(error);
    }
  }

  const handleLogout = async ()=> {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch {
      console.error('Failed to log out user')
    }
  }

  const handlesub = async (url: string) => {
    try {
    const collectionref = collection(db, `customers/${user?.uid}/checkout_sessions`);
    const docRef = await addDoc(collectionref, {
      price: "price_1OlPxdLKGV5ROCJ9hfCvRF1E",
      success_url: 'http://localhost:3001/subbed',
      cancel_url: 'http://localhost:3001',
      });

      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data && data.url) {
            window.open(data.url);
          }
        } else {
          console.log("No document mounted");
        }
      });
      return unsubscribe;

    } catch(error) {
      console.error(error);
      setError("An error occurred when trying to create a subscription.");
    }
  }

  if (loading) {
    return  <p>Loading...</p>;
  }

  if (user) {
    return <div className="flex flex-col">
            <p className="items-center w-full justify-center">dashboard component</p>
            <button className="outline bg-blue-500 rounded-xl" onClick={handleLogout}>Logout Button</button>
            <button className="outline m-4 bg-blue-500 rounded-xl" onClick={handlesub}>Subscribe</button>
          </div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button className="outline bg-blue-500 rounded-xl" onClick={handleLogin}>Login Button</button>
      <button className="outline bg-blue-500 rounded-xl" onClick={handleLogout}>Logout Button</button>
    </main>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

