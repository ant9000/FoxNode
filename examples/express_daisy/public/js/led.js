function LED(elem,state,color){
  this.elem           = document.getElementById(elem);
  this.elem.innerHTML = '<div></div>';
  this.led            = this.elem.getElementsByTagName('div')[0];
  this.set(state,color);
}
LED.prototype.set = function(state,color){
  this.state         = state;
  this.color         = color;
  this.led.className = ['led',(this.color=='green'?'green':'red'),(this.state?'on':'off')].join(' ');
}
LED.prototype.on         = function(){ this.set(1,this.color); }
LED.prototype.off        = function(){ this.set(0,this.color); }
LED.prototype.toggle     = function(){ this.set((this.state?0:1),this.color); }
LED.prototype.red        = function(){ this.set(this.state,'red'); }
LED.prototype.green      = function(){ this.set(this.state,'green'); }
LED.prototype.colorcycle = function(){ this.set(this.state,(this.color=='green'?'red':'green')); }
