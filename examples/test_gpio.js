#!/usr/bin/node

var acme = require('../acme');

// setup two gpio pins on the FoxBoardG20
var pins = [
  { name: 'J7.3', direction: 'in',  gpio: null }, // using Fox J7 connector name
  { name: 83, direction: 'out', gpio: null },     // J7.4, directly by kernel id
];
for(var i=0;i<pins.length;i++){
  var pin = pins[i];
  try{ 
    pin.gpio = new acme.gpio.GPIO(pin.name,pin.direction);
    // log to console gpio data events
    pin.gpio.on('data',function(data){
      console.log(
        'GPIO Pin state change: '+
        'name = '+data.name+', '+
        'value = '+data.value+', '+
        'count = '+data.count
      );
    });
  }catch(err){
    console.log('ERROR on '+pin.name+': '+err);
  }
}

// send a SIGHUP to dump pin state on console
process.on('SIGUSR1',function(){
  for(var i=0;i<pins.length;i++){
    var pin = pins[i];
    if(pin){
      console.log(
        pin.name+': '+
        'direction = '+pin.gpio.direction()+', '+
        'value = '+pin.gpio.value()+', '+
        'count = '+pin.gpio.count
      );
    }
  }
});

// send a SIGUSR2 to toggle J7.4
process.on('SIGUSR2',function(){ var v=pins[1].gpio.value(); pins[1].gpio.value(1-v); });
