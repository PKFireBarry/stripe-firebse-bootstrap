'use client'

import { useEffect, useState } from "react"
import React from 'react'
import {auth, db} from "../../../firebase"
import {doc, setDoc, getDoc} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function page() {
    const [user, loading] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(true)

    const addUserToDatabase = async (userData: {
        name:  string; 
        joinedAt: Date;
    }) => {
        try {
            setIsLoading(true)
            if (!user) {
              throw new Error('Not logged in')  
            }

            const userDocRef = doc(db, `subscribers/${user.email}`);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                console.error("Already have this email on the database")
                throw new Error ('Email already registered');
            }

            await setDoc(userDocRef, userData);
            console.error('user added to DB');
            
        } catch(error) {
            console.error('Error adding user to DB', (error as Error).message);
        }
    }

    useEffect(()=>{
        if (user) {
            const userData = {
                name: user.displayName || 'Anonymous',
                joinedAt: new Date(),
            };
            addUserToDatabase(userData)

            const delay = setTimeout(() => {
                setIsLoading(false);
                window.location.assign('/');
            }, 3000);

            return () => clearTimeout(delay);
        }
    }, [user]);

  return (
    <div>page</div>
  )
}
