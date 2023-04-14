'use strict';

require('dotenv').config({ path: '../../.env' });

let jsforce = require('jsforce');

const { JSForceUtil } = require('../sf/jsforceutil');

const jsForceUtil = new JSForceUtil();

jsForceUtil.getConnection()
    .then(conn => {
        console.log('Access Token: ' + conn.accessToken);

        // const channel = "/data/AccountChangeEvent"; // CDC Data Channel
        const channel = "/event/CustomPlatformEvent__e"; // Platform Events Data Channel
        
        //const replayId = NNN // Starting From Specific Event
        //const replayId = -2; // All Available Events
        const replayId = -1; // New Events Only

        const fayeClient = conn.streaming.createClient([
            new jsforce.StreamingExtension.Replay(channel, replayId),
            new jsforce.StreamingExtension.AuthFailure(() => process.exit(1))
        ]);

        const subscription = fayeClient.subscribe(channel, data => {
            console.log('Topic received data ', JSON.stringify(data));
        });
    })
    .catch(err => console.log(err));