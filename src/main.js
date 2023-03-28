import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJC81zlbkl3p0BillgZW9EQCjRAgH1ruk',
  authDomain: 'asameshi-380120.firebaseapp.com',
  projectId: 'asameshi-380120',
  storageBucket: 'asameshi-380120.appspot.com',
  messagingSenderId: '878490165462',
  appId: '1:878490165462:web:115d595950e47321826977',
};

initializeApp(firebaseConfig);
// const initFirebase = initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.mount('#app');

