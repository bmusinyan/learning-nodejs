// debugger
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');

// helmet
const helmet = require('helmet');

// morgan to log HTTP requests
const morgan = require('morgan');

const express = require('express');
const app = express();

// express is a combination of middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(helmet());
// tiny is the simplest version / format of the morgan
// if (app.get('env') === 'development') {
//     console.log("Morgan enabled");
//     app.use(morgan('tiny'));
// }

// Configuration
console.log('App name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

// don't use unnecessary middleware since it will slow
// down the performance of your app


// debugger
startupDebugger("Startup message");
dbDebugger("DB message");


const myPort = process.env.PORT || 3000;
app.listen(myPort, () => {
    console.log(`Listening to ${myPort}`);
});