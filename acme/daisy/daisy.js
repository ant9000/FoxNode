var gpio   = require('../gpio'),
    events = require('events'),
    util   = require('util');

function Daisy5(port){
  events.EventEmitter.call(this);
  var ports = [ 'D2', 'D5' ];
  if(!port in ports){ throw new Error("Invalid port '"+port+"'"); }
  this.port  = port;
  this._gpio = {};
  (function(self){ 
    var props = { };
    for(var i=1;i<=8;i++){
       var btn = 'P'+i, pin = self.port+'.'+(i+1);
       try{
         self._gpio[btn] = new gpio.GPIO(pin,'in');
       }catch(err){
         console.log('ERROR: Daisy-5 at '+self.port+', '+btn+' unavailable');
       }
       if(self._gpio[btn]){
//console.log('Daisy5('+self.port+').'+btn+' = '+pin+' ('+self._gpio[btn].kernelid+' '+self._gpio[btn].direction()+')');
         (function(btn){
           self._gpio[btn].on('data',function(data){
             self.emit('data',{port: self.port, button: btn, value: data.value, count: data.count});
           });
           props[btn] = { get: function(){ return self._gpio[btn].value(); }, set: function(){} };
         })(btn);
       }
    };
    Object.defineProperties(self,props);
    self.state = function(btn){ if(self._gpio[btn]){ return self._gpio[btn].value(); } }
  })(this);
}
util.inherits(Daisy5,events.EventEmitter);

function Daisy11(port){
  events.EventEmitter.call(this);
  var ports = [ 'D2', 'D5' ];
  if(!port in ports){ throw new Error("Invalid port '"+port+"'"); }
  this.port  = port;
  this._gpio = {};
  (function(self){ 
    var props = { };
    props['status'] = { };
    for(var i=1;i<=8;i++){
       var led = 'L'+i, pin = self.port+'.'+(i+1);
       try{
         self._gpio[led] = new gpio.GPIO(pin,'out');
       }catch(err){
         console.log('ERROR: Daisy-11 at '+self.port+', '+led+' unavailable');
       }
       if(self._gpio[led]){
//console.log('Daisy11('+self.port+').'+led+' = '+pin+' ('+self._gpio[led].kernelid+' '+self._gpio[led].direction()+')');
         (function(led){
           self._gpio[led].on('data',function(data){
             self.emit('data',{port: self.port, led: led, value: data.value, count: data.count});
           });
           props[led]={ get: function(){ return self._gpio[led].value(); }, set: function(v){ return self._gpio[led].value(v); } };
           props['status'][led] = props[led];
         })(led);
       }
    };
    Object.defineProperties(self,props);
    self.state = function(led,v){ if(self._gpio[led]){ return self._gpio[led].value(v); } }
  })(this);
}
util.inherits(Daisy11,events.EventEmitter);

exports.Daisy5  = Daisy5;
exports.Daisy11 = Daisy11;
