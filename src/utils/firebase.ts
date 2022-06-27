import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator,getFirestore } from 'firebase/firestore';
import { connectStorageEmulator,getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDt3eCRC30e-d3V77j3EnBhgyp6r3GHNMc',
    authDomain: 'alai-prod.firebaseapp.com',
    projectId: 'alai-prod',
    storageBucket: 'alai-prod.appspot.com',
    messagingSenderId: '830596306016',
    appId: '1:830596306016:web:b83aa2536f215bb66b5f05',
    measurementId: 'G-KL7V4NMVXF',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

if (process.env.REACT_APP_EMULATE === 'true') {
    console.log('init emulator')
    connectFirestoreEmulator(firestore, 'localhost', 8081);
    connectStorageEmulator(storage, 'localhost', 9199);
}

console.log('init firebase');

export { analytics, firestore, storage };
