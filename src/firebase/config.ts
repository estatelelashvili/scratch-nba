// export const firebaseConfig = {
//   apiKey: "AIzaSyB5-UBeaQrP_8Uf509ozzdbwPawvRVU5x0",
//   authDomain: "basketballgame-1955f.firebaseapp.com",
//   projectId: "basketballgame-1955f",
//   storageBucket: "basketballgame-1955f.firebasestorage.app",
//   messagingSenderId: "113026174468",
//   appId: "1:113026174468:web:55357d950b8d3f7a1cef51",
//   measurementId: "G-33MD14Z98Q",
// };

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
};
