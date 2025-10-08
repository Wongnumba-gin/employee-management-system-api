const admin = require('firebase-admin');
let db: any;

const initFirebase = (serviceAccount) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  db = admin.firestore();
  //assigns the Firestore instance to the 'db' variable
};

const getDb = () => {
  if (!db) {
    throw new Error('Firestore has not been initialized!');
  }
  return db;
};

module.exports = {
    initFirebase,
    getDb,
};