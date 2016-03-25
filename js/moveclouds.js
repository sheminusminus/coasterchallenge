// illustrator sometimes appends _1_ to IDs for mysterious reasons.
function sel(s, name) {
  if (name[0] != '#') { name = '#' + name; }
  return s.select(name+'_1_') || s.select(name);
}


$(document).ready(function() {
  var root = Snap('#infograph');
  Snap.load('svg/cloudsR.svg', function(scene) {
	 
	 scene.
	  
  });
  
}
