# Web Camera Filtered 

This application uses relies on source code from [Node WebCam](https://www.npmjs.com/package/node-webcam)[Node WebCam]. S This app adds filters that are cycled through authomatically to the web page that shows the current snapshot.

## Manually start the app

This is setup to run on Windows 10.  The startup.bat calls for the node app to start and then waits 10 seconds and opens the web page in MS Edge.  
If you login as "kiosk" you will be in the "\Users\kiosk" home directory and you can manually start the app.

```
startup.bat
```

## Autostart the app  

A shortcut to the startup.bat file was created and placed in the kiosk user start directory and this should cause the node app the start the web page to load in Edge automatically.

## Two Batch files  
`startup.bat` calls `startcam` to start the node server that takes the snapshots using the system camera.  It then waits 10 seconds and starts edge with the index.html under the project's www folder.

## Two possible cameras
If you are just using the local laptop camera you can set thedevice option in `src/Webcam.js` to '1' or false.  If you want to use a camera connected to the USB port on the laptop, set the value to '2'.