/**
 * Websocket server app
 *
 * Will use base64 return to the websocket clients and
 * in memory capturing without saving
 *
 */
"use strict";
var port = 9090;
var HTTP = require( "http" );
var FS = require( "fs" );
var HTML_CONTENT = FS.readFileSync( __dirname + "/www/index.html" );
var WS = require( "ws" );
var WSS = new WS.Server({ port: 9091 });
var CAPTURE_RATE = 5000;
// Broadcast to all.
WSS.broadcast = function broadcast( data ) {
    WSS.clients.forEach( function each( client ) {
        client.send( data );
    });
};

<<<<<<< HEAD
var NodeWebcam = require( "./index.js" );
=======
var NodeWebcam = require( "./index" );
>>>>>>> da167f6d161965aaf90855c9e47cfd18c88c11df
var Webcam = NodeWebcam.create({
    callbackReturn: "base64",
    saveShots: false
});

// Main
init();
function init() {
    setupHTTP();
    setupWebcam();
    console.log( "Visit localhost:9090" );
}

function setupHTTP() {
    var server = HTTP.createServer();
    server.on( "request", function( request, response ) {
        response.write( HTML_CONTENT );
        response.end();
    });
    server.listen( port );
}

function setupWebcam() {
    function capture() {
        Webcam.capture( "picture", function( err, data ) {
            if( err ) {
                throw err;
            }
            WSS.broadcast( data );
            setTimeout(capture, CAPTURE_RATE);
        });
    }
    capture();
}
