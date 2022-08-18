const functions = require("firebase-functions");
const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', router);
app.listen(8085, ()=>{
    console.log('Server started on PORT=8085');
});

exports.api = functions.https.onRequest((app));