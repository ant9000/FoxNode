#!/usr/bin/node

var acme = require('../../acme');

// setup two gpio pins on the FoxBoardG20
var pins = [
  { name: 'J7.3', direction: 'in',  gpio: null },
  { name: 'J7.4', direction: 'out', gpio: null },
];
for(var i=0;i<pins.length;i++){
  var pin = pins[i];
  pin.gpio = new acme.gpio.GPIO(pin.name,pin.direction);
}

// start the web stuff
var meryl   = require('meryl'),
    connect = require('connect');

meryl.plug( // configure Meryl and Connect
  connect.logger(),                                                                // log incoming requests on console
  function(req, resp, next) { resp.setHeader('server', 'meryl-nodejs'); next(); }, // add a custom header
  connect.favicon(),                                                               // use a favicon
  connect.static(__dirname+'/static/')                                             // publish static files from 'static/'
);

var cgi = meryl.cgi({debug:false,templateDir:'views'}), // instantiate Meryl, use views from directory 'views/'
    app = require('http').createServer(cgi);            // serve Meryl app via http
    io  = require('socket.io').listen(app);             // add support for bidirectional communication using socket.io

io.set('log level', 1); // produce a log, but not a too verbose one

io.sockets.on('connection',function(socket){
  console.log('connected',socket.id); // log each connected client on console
  socket.on('disconnect',function (){ console.log('disconnected',socket.id); }); // log disconnections, too
  for(var i=0;i<pins.length;i++){
    var pin = pins[i];
    // data event on pin.gpio will be re-emitted on each connected socket
    pin.gpio.on('data',function(data){ socket.emit('data',data); });
    // send initial data to client
    socket.emit('data',{ name: pin.name, value: pin.gpio.value(), count: pin.gpio.count });
  }
  // react to events coming from the views
  socket.on('data',function(data){
    console.log('data',data); // log on console data coming from client
    // we expect data of the form { name: 'xxx', value: x }:
    for(var i=0;i<pins.length;i++){
      var pin = pins[i];
      if(pin.name==data.name){
        if(pin.direction=='out'){ pin.gpio.value(data.value?1:0); }
        break;
      }
    }
  });
});

/////////////////////
// main
app.listen(8080,'0.0.0.0');  // listen on port 8080
