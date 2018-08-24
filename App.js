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

// Broadcast to all.

WSS.broadcast = function broadcast( data ) {

    WSS.clients.forEach( function each( client ) {

        client.send( data );

    });

};

var NodeWebcam = require( "./../../" );

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
        // console.log("capture");
        Webcam.capture( "picture", function( err, data ) {
            // console.log("captured");
            if( err ) {

                throw err;

            }

            // FS.createReadStream('./picture.jpg').pipe(FS.createWriteStream(__dirname + "/www/test.jpg"));
            // FS.copyFileSync('picture.jpg',__dirname + "/www/test.jpg");
            // console.log(__dirname);
            // let fileToSave = __dirname + "/../www/images/test.jpg";
            // console.log("filetosave",fileToSave)
            // FS.writeFileSync(__dirname + "/www/test.jpg", data, {flag: 'w'} ,function(err) {
            //     if(err) {
            //         return console.log(err);
            //     }
            
            //     console.log("The file was saved!");
            // }); 

            WSS.broadcast( data );

            setTimeout( capture, 1000 );

        });

    }

    capture();

}
