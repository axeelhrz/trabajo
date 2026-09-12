import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCx3NHL2SoCnHqDtQh4AufxGz5kSqULUDg',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'trabajos-95685.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'trabajos-95685',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'trabajos-95685.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '453282942010',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:453282942010:web:b22f3adc3c05b3d9f6b903',
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId,
  )
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
