import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAHNazNjUL3dCWW-sNtvBvsVpAKRyV2f8A",
	authDomain: "vertex-fa017.firebaseapp.com",
	projectId: "vertex-fa017",
	storageBucket: "vertex-fa017.appspot.com",
	messagingSenderId: "599356629591",
	appId: "1:599356629591:web:ddc6235d0fc7e7ebe87912",
      }

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;	