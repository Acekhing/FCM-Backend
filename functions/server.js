const functions = require("firebase-functions");
const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');
const env = require('dotenv').config()

const app = express();

const BASE_URL = 'https://fcm.googleapis.com/fcm/send';
const CONTENT_TYPE ='application/json';

const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.post('/v2/send/user', (req, res) => {

    const notification = req.body.notification;
    const data = req.body.data;
    const token = req.body.token;


    const message = {
        to: token,
        dry_run: true,
        data: data,
        notification: {
            title: notification.title,
            body: notification.body,
            click_action: 'intent-news-detail'
        }
    }

});

app.use('/api', router);
app.listen(env.PORT, ()=>{
    console.log('Server started on PORT='+env.parsed.PORT);
});

exports.api = functions.https.onRequest((app));