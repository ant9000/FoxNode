function LCD(elem,digits,pad){
  this.elem=document.getElementById(elem);
  this.digits=digits;
  var html='';
  for(var i=0;i<digits;i++){
    html += '<div class="digit">'+
      '<div class="s1 s h t"></div>'+
      '<div class="s2 s v t l"></div>'+
      '<div class="s3 s v t r"></div>'+
      '<div class="s4 s h m"></div>'+
      '<div class="s5 s v m l"></div>'+
      '<div class="s6 s v m r"></div>'+
      '<div class="s7 s h b"></div>'+
    '</div>';
  }
  this.pad='';
  if(typeof(pad)==typeof('') && pad.length){ for(var i=0;i<digits;i++){ this.pad+=pad[0]; } }
  this.elem.innerHTML=html;
}
LCD.prototype.display = function(str){
  str=''+str;
  if(this.pad && str.length<this.digits){ str = (this.pad+str).slice(-this.digits); }
  var hex2seg = {
    '0':   [0,1,2,4,5,6],
    '1':   [2,5],
    '2':   [0,2,3,4,6],
    '3':   [0,2,3,5,6],
    '4':   [1,2,3,5],
    '5':   [0,1,3,5,6],
    '6':   [0,1,3,4,5,6],
    '7':   [0,2,5],
    '8':   [0,1,2,3,4,5,6],
    '9':   [0,1,2,3,5,6],
    'A':   [0,1,2,3,4,5],
    'B':   [1,3,4,5,6],
    'C':   [0,1,4,6],
    'D':   [2,3,4,5,6],
    'E':   [0,1,3,4,6],
    'F':   [0,1,3,4]
  };
  var digits=this.elem.getElementsByClassName('digit');
  for(var i=0;i<digits.length;i++){
    var segments = digits[i].getElementsByTagName('div');
    for(var j=0;j<segments.length;j++){ segments[j].hidden = true; } 
    if(i<str.length){
      var lit = hex2seg[str[i]];
      for(var j=0;j<lit.length;j++){ segments[lit[j]].hidden = false; } 
    }
  }
};
