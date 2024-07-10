// services/firebaseService.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { firebaseConfig } from "../../firebaseConfig";

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
          await updateDoc(docRef, { count: increment(1) });
      }
  }
}
const firebaseService = new FirebaseService();
export default firebaseService;
