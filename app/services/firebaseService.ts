// services/firebaseService.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { firebaseConfig } from "../../firebaseConfig";
import { getDoc, setDoc } from "firebase/firestore";


class FirebaseService {
    private app;
    private db;
    private analytics: any;

  constructor() {
    if (typeof window !== "undefined") {
      this.app = initializeApp(firebaseConfig);
      this.db = getFirestore(this.app);
      isSupported().then((supported) => {
        if (supported) {
          this.analytics = getAnalytics(this.app);
        }
      });
    }
  }

  logClickEvent(id: string) {
    if (this.analytics) {
      logEvent(this.analytics, `click_${id}`);
    }
  }

  async incrementClickCount(id: string) {
    if (this.db) {
      const docRef = doc(this.db, "clicks", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        await updateDoc(docRef, { count: increment(1) });
      } else {
        await setDoc(docRef, { count: 1 });
      }
    }
  }
}
const firebaseService = new FirebaseService();
export default firebaseService;
