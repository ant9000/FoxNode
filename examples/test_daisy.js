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
  for(var i=1;i<=8;i++){
    console.log('Daisy5.P'+i+' = '+daisy5.state('P'+i));
  }
  for(var i=1;i<=8;i++){
    console.log('Daisy11.L'+i+' = '+daisy11.state('L'+i));
  }
});
// send a SIGUSR2 to toggle Daisy11.L3
process.on('SIGUSR2',function(){ daisy11.L3=1-daisy11.L3; });
