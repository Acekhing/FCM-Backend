const functions = require("firebase-functions");
const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');
const env = require('dotenv').config()

const app = express();

const BASE_URL = 'https://fcm.googleapis.com/fcm/send';

const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.post('/v2/send/user', (req, res) => {

    const notification = req.body.notification;
    const data = req.body.data;
    const token = req.body.token;

    const message = {
        to: token,
        dry_run: true, // Comment before production
        data: data,
        notification: {
            title: notification.title,
            body: notification.body,
            click_action: 'intent-news-detail'
        }
    }

     // Send request
     request.post({
        headers: {
            'Authorization': 'Key='+ process.env.SERVER_KEY,
            'Content-Type': 'application/json'
        },
        url: BASE_URL,
        body: JSON.stringify(message),
    }, (error, response, body)=>{
        res.end(body);
        if(error) {
            console.log('Error sending message: ', error);
        }
    });

});

router.post('/v2/send/users', (req, res) => {

    const notification = req.body.notification;
    const data = req.body.data;
    const tokens = req.body.tokens;

    const message = {
        registration_ids: tokens,
        dry_run: true, // Comment before production
        data: data,
        notification: {
            title: notification.title,
            body: notification.body,
            click_action: 'intent-news-detail'
        }
    }

     // Send request
     request.post({
        headers: {
            'Authorization': 'Key='+ process.env.SERVER_KEY,
            'Content-Type': 'application/json'
        },
        url: BASE_URL,
        body: JSON.stringify(message),
    }, (error, response, body)=>{
        res.end(body);
        if(error) {
            console.log('Error sending message: ', error);
        }
        console.log(body);
    });

});

router.post('/v2/send/topic', (req, res) => {

    const notification = req.body.notification;
    const data = req.body.data;
    const topic = req.body.topic;

    const message = {
        to: topic,
        dry_run: true, // Comment before production
        data: data,
        notification: {
            title: notification.title,
            body: notification.body,
            click_action: 'intent-news-detail'
        }
    }

     // Send request
     request.post({
        headers: {
            'Authorization': 'Key='+ process.env.SERVER_KEY,
            'Content-Type': 'application/json'
        },
        url: BASE_URL,
        body: JSON.stringify(message),
    }, (error, response, body)=>{
        res.end(body);
        if(error) {
            console.log('Error sending message: ', error);
        }
        console.log(body);
    });

});

app.use('/api', router);
app.listen(env.parsed.PORT, ()=>{
    console.log('Server started on PORT='+env.parsed.PORT);
});

exports.api = functions.https.onRequest((app));