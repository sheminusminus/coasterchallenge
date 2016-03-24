$(document).ready(function() {
	
	var s = Snap('#infograph');
	var lastTrackPoint;
	var currentSubpath;
	var subpathFound = false;
	var currentLength = 0;
	
	var checkY = ($(window).height() - $('#infograph').offset().top) - 10;
	var checkX = $('#infograph').width();
	
	Snap.load('trackfull.svg', function(f) {
	
		var trackPath = f.select('#trackPath').attr({display: 'none'});
		var dino = f.select('#dinoCar');
		var len = Snap.path.getTotalLength(trackPath.attr("d"));
		var track = s.path().attr({
                    fill: "none",
                    stroke: "#F27D4F",
                    strokeWidth: 7,
                    strokeDasharray: "7 0"
        });
		s.append(dino); 
        
        
        //=======================
        //=======================
        var i = 0;
        while (!subpathFound) {
	        i += 5;
	       	var pt = trackPath.getPointAtLength(i);
	        if (pt.y >= checkY) {
		        subpathFound = true;
		        currentLength = Snap.path.getTotalLength(trackPath.getSubpath(0,i));
	        }
        }
        subpathFound = false;
        //=======================
        //=======================
                
        Snap.animate(0, currentLength, function(l) {
	        var dot = trackPath.getPointAtLength(l);
			track.attr({
				d: trackPath.getSubpath(0, l)
			});		
			
        }, 6000);
        
        Snap.animate(0, currentLength, function(l) {
		    var dot = trackPath.getPointAtLength(l);
			dino.attr({
				x: dot.x - 100,
				y: dot.y - 160
			});
        }, 12000, mina.easeout);
	
	});
	
});
