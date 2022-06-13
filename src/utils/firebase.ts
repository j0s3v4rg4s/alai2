import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

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
const firestore = getFirestore(app)

console.log('init firebase');

export { analytics, firestore };
