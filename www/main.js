(function() {

  "use strict";

  var container = document.getElementById( "container" );

  var img = document.getElementById( "img" );

  var ws = new WebSocket( "ws://localhost:9091" );

  ws.onmessage = function( data ) {

      img.src = data.data;

  };

})();