"use client";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  Auth,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { firebaseConfig } from "../firebase/config";
import { log } from "console";

const appId = firebaseConfig.appId;
const initialAuthToken = null;

export const useFirebase = () => {
  const [db, setDb] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") return;
    if (!firebaseConfig.apiKey || !appId) {
      console.log("Firebase config is missing!");
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestore);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
          setIsAuthReady(true);
        } else if (!initialAuthToken) {
          try {
            const anonymousUser = await signInAnonymously(firebaseAuth);
            setUserId(anonymousUser.user.uid);
          } catch (error) {
            console.error("Anonymous sign-in failed:", error);
          } finally {
            setIsAuthReady(true);
          }
        } else {
          setIsAuthReady(true);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.log("Firebase initialization error:", error);
      setIsAuthReady(true);
    }
  }, [appId]);
  return { db, auth, userId, isAuthReady };
};
