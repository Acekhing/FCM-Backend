const functions = require("firebase-functions");
const { google } = require('googleapis');
const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

const PROJECT_ID = 'anonymous-3d677';
const HOST = 'https://fcm.googleapis.com';
const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.post('/sendToDevice', (req, res) => {

    getAccessToken().then((access_token) => {
        // const notification data
        const title = req.body.notification.title;
        const body = req.body.notification.body;
        const data = req.body.data;
        const client_token = req.body.token;

        const score = data.score;
        const mtime = data.time;

        const message = {
            message: {
                token: client_token,
                notification: {
                    title: title,
                    body: body
                },
                data: {
                    score: score,
                    mtime: mtime
                }
            }
          };

        // Send request
        request.post({
            headers: {
                Authorization: 'Bearer '+access_token
            },
            url: HOST+PATH,
            body: JSON.stringify(message),
        }, (error, response, body)=>{
            res.end(body);
            if(error) {
                console.log('Error sending message: ', error);
            }
        });

    });
});

app.use('/api/v1', router);
app.listen(8085, ()=>{
    console.log('Server started on PORT=8085');
});

function getAccessToken() {
    return new Promise(function(resolve, reject) {
      const key = require('./service-account.json');
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
}


exports.api = functions.https.onRequest((app));