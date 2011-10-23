var fs     = require('fs'),
    events = require('events'),
    util   = require('util'),
    spawn  = require('child_process').spawn;

var __instances__ = [];
function GPIO(name,direction,value){
  events.EventEmitter.call(this);
  var kernelid_table = {
    // J6
    'J6.3'  :  92, 'J6.4'  :  71, 'J6.5'  :  70, 'J6.6'  :  93, 'J6.7'  :  90, 'J6.8'  :  69, 'J6.9'  :  68,
    'J6.10' :  91, 'J6.13' :  75, 'J6.14' :  74, 'J6.15' :  77, 'J6.16' :  76, 'J6.17' :  85, 'J6.18' :  84,
    'J6.19' :  95, 'J6.20' :  94, 'J6.21' :  63, 'J6.22' :  62, 'J6.24' :  38, 'J6.25' :  39, 'J6.26' :  41,
    'J6.27' :  99, 'J6.28' :  98, 'J6.29' :  97, 'J6.30' :  96, 'J6.31' :  56, 'J6.32' :  55, 'J6.36' :  42,
    'J6.37' :  54, 'J6.38' :  43,
    // J7
    'J7.3'  :  82, 'J7.4'  :  83, 'J7.5'  :  80, 'J7.6'  :  81, 'J7.7'  :  66, 'J7.8'  :  67, 'J7.9'  :  64,
    'J7.10' :  65, 'J7.11' : 110, 'J7.12' : 111, 'J7.13' : 108, 'J7.14' : 109, 'J7.15' : 105, 'J7.16' : 106,
    'J7.17' : 103, 'J7.18' : 104, 'J7.19' : 101, 'J7.20' : 102, 'J7.21' :  73, 'J7.22' :  72, 'J7.31' :  87,
    'J7.32' :  86, 'J7.33' :  89, 'J7.34' :  88, 'J7.35' :  60, 'J7.36' :  59, 'J7.37' :  58, 'J7.38' :  57,
    // Daisy
    'D1.2'  :  70, 'D1.3'  :  71, 'D1.4'  :  92, 'D1.5'  :  93, 'D1.7'  :  55, 'D1.8'  :  56,
    'D2.2'  :  63, 'D2.3'  :  62, 'D2.4'  :  61, 'D2.5'  :  60, 'D2.6'  :  59, 'D2.7'  :  58, 'D2.8'  :  57, 'D2.9'  :  94,
    'D3.2'  :  68, 'D3.3'  :  69, 'D3.4'  :  90, 'D3.5'  :  91, 'D3.6'  :  86, 'D3.7'  :  88, 'D3.8'  :  89, 'D3.9'  :  87,
    'D4.5'  :  96, 'D4.6'  :  97, 'D4.7'  :  98, 'D4.8'  :  99, 
    'D5.2'  :  76, 'D5.3'  :  77, 'D5.4'  :  80, 'D5.5'  :  81, 'D5.6'  :  82, 'D5.7'  :  83, 'D5.8'  :  84, 'D5.9'  :  85,
    'D6.2'  :  74, 'D6.3'  :  75, 'D6.4'  : 104, 'D6.5'  : 106, 'D6.6'  :  95, 'D6.7'  :  55, 'D6.8'  :  56,
    'D7.2'  :  65, 'D7.3'  :  64, 'D7.4'  :  66, 'D7.5'  :  67, 'D7.6'  : 101, 'D7.7'  : 100, 'D7.8'  :  99,
    'D8.2'  :  72, 'D8.3'  :  73, 'D8.7'  :  55, 'D8.8'  :  56
  };
  this._attrs = {
    'direction': ['in','out'],
    'edge':      ['none','both'],
    'value':     ['0','1'],
  }

  if(kernelid_table[name]!=undefined){
    this.kernelid = kernelid_table[name];
    this.name     = name;
  }else{
    var id=parseInt(name);
    if(id>=1 && id<=96){
      this.kernelid = id;
      this.name     = name;
    }else{
      throw new Error("Undefined name '"+name+"'");
    }
  }
  this.iopath   = '/sys/class/gpio/gpio'+this.kernelid;
  try{
    fs.statSync(this.iopath);
  }catch(err){
    fs.writeFileSync('/sys/class/gpio/export',''+this.kernelid);
  };
  this._count = 0;
  (function(self){ 
    var props = { };
    props['count'] = { get: function(){ return self._count; }, set: function(){ /* ignore */ } };
    Object.defineProperties(self,props);
  })(this);
  this.direction(direction);
  this.value(value);
  this.resume();
  __instances__.push(this);
}
util.inherits(GPIO,events.EventEmitter);
GPIO.prototype.attr = function(attr,val){
  var ret = null;
  if(this._attrs[attr]==undefined){ throw new Error("Undefined attribute '"+attr+"'"); }
  try{
    fs.statSync(this.iopath);
    if(val==undefined){
      ret = fs.readFileSync(this.iopath+'/'+attr,'utf8').trim();
    }else{ 
      if(this._attrs[attr].indexOf(''+val)<0){ throw new Error("Undefined value '"+val+"' for attribute '"+attr+"'"); }
      try{
        fs.writeFileSync(this.iopath+'/'+attr,''+val);
        //console.log(this.iopath+'/'+attr+'='+val+' OK');
      }catch(err){ 
        console.log('ERR: '+this.iopath+'/'+attr+'='+val+' failed: '+err);
      };
      ret = val;
    }
  }catch(err){
    //gpio is not exported - fail
    throw new Error("GPIO pin "+this.name+" is not available.");
  }
  return ret;
};
GPIO.prototype.direction = function(direction){ return this.attr('direction',direction); };
GPIO.prototype.value     = function(value)    { return parseInt(this.attr('value',value)); }
GPIO.prototype.edge      = function(edge)     { return this.attr('edge',edge); }
GPIO.prototype.resume    = function(){
  this.edge('both');
  if(this.poll!=undefined){ this.poll.kill('SIGHUP'); }
  this.poll = spawn(__dirname+'/poll',[this.iopath+'/value']);
  this.poll.stdout.setEncoding('utf8');
  (function(self){
    self.poll.stdout.on('data',function(data){
      //console.log('GPIO['+self.name+']="'+data+'"');
      var src=self.iopath+'/value:';
      var tmp=''+data;
      var idx=tmp.indexOf(src);
      if(idx>-1){
        self._count += 1;
        tmp=data.substr(src.length).trim();
        self.emit('data',{name:self.name,value: parseInt(tmp),count: self._count});
      }
    });
  })(this);
};
GPIO.prototype.pause = function(){
  this.edge('none');
  if(this.poll!=undefined){ this.poll.kill('SIGHUP'); }
}
GPIO.prototype.destroy = function(){
  //console.log('destroy '+this.name);
  this.pause();
  try{
    fs.statSync(this.iopath);
    fs.writeFileSync('/sys/class/gpio/unexport',''+this.kernelid);
  }catch(err){};
  var idx=__instances__.indexOf(this);
  if(idx>-1){ delete __instances__[idx]; }
}

var __cleaning__ = false; //poor man's semaphore
function __cleanup__(){
  //console.log('__cleanup__');
  if(__cleaning__){ return false; }
  __cleaning__ = true;
  for(var i=__instances__.length-1;i>=0;i--){ __instances__[i].destroy(); }
  return false;
}
process.on('exit',__cleanup__);
process.on('SIGINT',__cleanup__);
process.on('SIGHUP',__cleanup__);
process.on('SIGTERM',__cleanup__);

exports.GPIO = GPIO;

