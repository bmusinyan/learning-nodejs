// 1. we can use this functions in NodeJS

// console.log();

// setTimeout();
// clearTimeout();

// setInterval();
// clearInterval();

var message = 'Brian';

// 2. in Node there is no global "window" object, so we cannot use
// window.message, window.setTimeout(), ...

// Instead, Node uses "global" object to access
// global.message, global.setTimeout(), ...

// NOTE* just like "window", we don't have to use "global" like
// shown above, just use its shorthand: message, setTimeout(), ...

// console.log(message);
// console.log(global.message);

// 3. in Node, variables do not get added to the GLOBAL object, they are only
// accessible to that file(module), not outside of it; hence it cannot be added 
// to the GLOBAL scope

// console.log(module);

// 4. in Node, each file is a module and its varibales are accessible only
// in that module

// its best to assign functions to const variables so that
// we do not reassign something else to it accidentally 
// const logger = require('./logger.old');

// logger('Brian is calling');

// 5. PATH module
const path = require('path');

var pathObj = path.parse(__filename);
// console.log(pathObj);


// 6. OS module
const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// console.log(totalMemory, freeMemory);

// 7. FILE SYSTEM module
const fs = require('fs');

// this module has function with "Sync" for syncronouse calls.
// avoid them in real world apps. use the ones without "Sync" keyword
// because these function are none blocking like the ones with "Sync"

// fs.readdir('./', function(err, files) {
//     if (err) {
//         console.log('Error', err);
//     }
//     else {
//         console.log('Result', files);
//     }
// });




