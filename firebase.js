
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJZ2BsxidPaD7Fv7iT_AEBQTiJz3TiR0I",
  authDomain: "organic-certified.firebaseapp.com",
  projectId: "organic-certified",
 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
