(function($){
var methods = {
  daisy5: {
    init: function(options){
      return this.each(function(){
        var $this=$(this);
        $this.addClass('daisy5');
        for(var i=1;i<=8;i++){ $this.append('<div class="P'+i+'"></div>'); }
      });
    },
    state: function(btn,value){
      var btn=$('.'+btn,$(this));
      if(value!=undefined){
        if(value){ btn.addClass('on'); }else{ btn.removeClass('on'); }
      }
      return btn.hasClass('on');
    }
  },
  daisy11: {
    init: function(options){
      return this.each(function(){
        var $this=$(this);
        $this.addClass('daisy11');
        for(var i=1;i<=8;i++){ $this.append('<div class="L'+i+'"></div>'); }
        //TODO: $this.bind('click.daisy11',function(event){ ... });
      });
    },
    state: function(led,value){
      var led=$('.'+led,$(this));
      if(value!=undefined){
        if(value){ led.addClass('on'); }else{ led.removeClass('on'); }
      }
      return led.hasClass('on');
    }
  },

};
// Daisy 5, 8 pushbuttons
$.fn.Daisy5 = function(method){
  var m=methods['daisy5'];
  if(m[method]){
    return m[method].apply(this,Array.prototype.slice.call(arguments,1));
  }else if(typeof method==='object'||!method){
    return m.init.apply(this,arguments);
  }else{
    $.error('Method '+method+' does not exist on jQuery.Daisy5' );
  } 
}

// Daisy 11, 8 leds
$.fn.Daisy11 = function(method){
  var m=methods['daisy11'];
  if(m[method]){
    return m[method].apply(this,Array.prototype.slice.call(arguments,1));
  }else if(typeof method==='object'||!method){
    return m.init.apply(this,arguments);
  }else{
    $.error('Method '+method+' does not exist on jQuery.Daisy11' );
  } 
}

})(jQuery);
