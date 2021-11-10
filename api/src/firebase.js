const { initializeApp } = require('firebase/app');
const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
  apiKey: 'AIzaSyCaA2YZFJ7vA18voIcYClzy90IQ5uNLjoI',
  authDomain: 'huellitas-a4e81.firebaseapp.com',
  projectId: 'huellitas-a4e81',
  storageBucket: 'huellitas-a4e81.appspot.com',
  messagingSenderId: '521643567557',
  appId: '1:521643567557:web:bd46b75168d8c4ecee43ac',
  measurementId: 'G-X681JSWRLC',
};

module.exports = initializeApp(firebaseConfig);
