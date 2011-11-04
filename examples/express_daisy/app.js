#!/usr/bin/node

var acme = require('../../acme'),
    express = require('express'),
    app     = module.exports = express.createServer(),
    io      = require('socket.io').listen(app);

// inits Daisy5 and Daisy11 objects
var daisy5, daisy11;

try{ daisy5  = new acme.daisy.Daisy5('D5');  }catch(err){ console.log('ERROR on Daisy-5: '+err);  }
try{ daisy11 = new acme.daisy.Daisy11('D2'); }catch(err){ console.log('ERROR on Daisy-11: '+err); }

app.configure(function(){
  // publish static contents from our media directory
  app.use(express.static(__dirname + '/../../media/'));
  // define views and template rendering engine options
  app.set('views',__dirname + '/views/');
  app.set('view options',{ layout: false });
});

// define the initial page
app.get('/', function(req, res){ res.render('index.ejs'); });

// configure communication with web clients
io.sockets.on('connection',function(socket){
  // send current state to client
  for(var i=1;i<=8;i++){
    socket.emit('daisy5', { port: daisy5.port, button: 'P'+i, value: daisy5.state('P'+i) });
    socket.emit('daisy11',{ port: daisy11.port, led: 'L'+i, value: daisy11.state('L'+i) });
  }
  // pass along data events to clients with the appropriate type
  daisy5.on('data',function(data){ socket.emit('daisy5',data); });
  daisy11.on('data',function(data){ socket.emit('daisy11',data); });
  // react to data events from client
  socket.on('daisy11',function(data){ daisy11.state(data.led,data.value); });
});

// start server
app.listen(3000);
