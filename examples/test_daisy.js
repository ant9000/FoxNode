#!/usr/bin/node

var acme = require('../acme');

var daisy5, daisy11;

try{ 
  daisy5 = new acme.daisy.Daisy5('D5');
  daisy5.on('data',function(data){
    console.log(
      'Daisy5 state change: '+
      'port = '+data.port+', '+
      'button = '+data.button+', '+
      'value = '+data.value+', '+
      'count = '+data.count
    );
  });
}catch(err){
  console.log('ERROR on Daisy-5: '+err);
}

try{ 
  daisy11 = new acme.daisy.Daisy11('D2');
  daisy11.on('data',function(data){
    console.log(
      'Daisy11 state change: '+
      'port = '+data.port+', '+
      'led = '+data.led+', '+
      'value = '+data.value+', '+
      'count = '+data.count
    );
  });
}catch(err){
  console.log('ERROR on Daisy-11: '+err);
}

// send a SIGUSR1 to dump state on console
process.on('SIGUSR1',function(){
  console.log('Daisy5.P1 = '+daisy5.P1);
  console.log('Daisy5.P2 = '+daisy5.P2);
  console.log('Daisy5.P3 = '+daisy5.P3);
  console.log('Daisy5.P4 = '+daisy5.P4);
  console.log('Daisy5.P5 = '+daisy5.P5);
  console.log('Daisy5.P6 = '+daisy5.P6);
  console.log('Daisy5.P7 = '+daisy5.P7);
  console.log('Daisy5.P8 = '+daisy5.P8);
  console.log('Daisy11.L1 = '+daisy11.L1);
  console.log('Daisy11.L2 = '+daisy11.L2);
  console.log('Daisy11.L3 = '+daisy11.L3);
  console.log('Daisy11.L4 = '+daisy11.L4);
  console.log('Daisy11.L5 = '+daisy11.L5);
  console.log('Daisy11.L6 = '+daisy11.L6);
  console.log('Daisy11.L7 = '+daisy11.L7);
  console.log('Daisy11.L8 = '+daisy11.L8);
});
// send a SIGUSR2 to toggle Daisy11.L3
process.on('SIGUSR2',function(){ var s=daisy11.L3; daisy11.L3=1-s; });
