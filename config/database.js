firebase = require('firebase');

const config = {
    apiKey: "AIzaSyB0sQyZ4Jo7PO13Y6ahIBiNche8xyMBHEw\n",
    authDomain: "web3-e03c0.firebaseapp.com",
    databaseURL: "https://web3-e03c0.firebaseio.com/",
};

//const database = firebase.database();

module.exports = () => {
    firebase.initializeApp(config);
};
