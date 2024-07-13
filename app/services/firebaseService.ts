// services/firebaseService.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment, arrayUnion, collection } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { firebaseConfig } from "../../firebaseConfig";
import { getDoc, setDoc } from "firebase/firestore";


class FirebaseService {
    private app;
    private db;
    private analytics: any;

  constructor() {
    if (typeof window !== "undefined") { {
      console.log("Initializing...");
      this.app = initializeApp(firebaseConfig);
      this.db = getFirestore(this.app);
      isSupported().then((supported) => {
        if (supported) {
          this.analytics = getAnalytics(this.app);
        }
      });
    }
    }
  }

  logClickEvent(id: string) {
    if (this.analytics) {
      logEvent(this.analytics, `click_${id}`);
    }
  }

  async incrementSiteVisits() {
    if (this.db) {
      const docRef = doc(this.db, "metrics", "site_visits");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        await updateDoc(docRef, { count: increment(1) });
      } else {
        await setDoc(docRef, { count: 1 });
      }
    }
  }

  async incrementClickCount(id: string) {
    if (this.db) {
      const docRef = doc(this.db, "metrics", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { clicks: increment(1) });
      } else {
        await setDoc(docRef, { clicks: 1 });
      }
    }
  }

  async incrementUniqueSiteVisits(uniqueVisitorId: string) {
    if (this.db) {
      const docRef = doc(this.db, "metrics", "unique_visits");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { 
          count: increment(1),
          visitors: arrayUnion({ 
            id: uniqueVisitorId,
            timestamp: new Date().toISOString(),
            language: navigator.language,
            platform: navigator.userAgent,
            referrer: document.referrer,
            screen: {
              width: window.screen.width,
              height: window.screen.height,
              availWidth: window.screen.availWidth,
              availHeight: window.screen.availHeight,
              colorDepth: window.screen.colorDepth,
              pixelDepth: window.screen.pixelDepth,
            },
          
          })
        });
      } 
      else {
        await setDoc(docRef, { count: 1, visitors:{ 
            id: uniqueVisitorId, 
            timestamp: new Date().toISOString(),
            language: navigator.language,
            platform: navigator.userAgent,
            referrer: document.referrer,
            screen: {
              width: window.screen.width,
              height: window.screen.height,
              availWidth: window.screen.availWidth,
              availHeight: window.screen.availHeight,
              colorDepth: window.screen.colorDepth,
              pixelDepth: window.screen.pixelDepth,
            }
          }});
      }
    }
  }
}
const firebaseService = new FirebaseService();
export default firebaseService;
