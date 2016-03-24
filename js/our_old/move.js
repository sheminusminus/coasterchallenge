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


		doodlePath(trackPath, 6000, currentLength, 0);
		moveAlongPathToWindowHeight(dino, trackPath, 12000, mina.easeout, 0, {x: -100, y: -160});
	
	
		// snapElement: snap svg element
		// snapPath: snap svg path (not a path string)
		// dur: duration in millis
		// ease: animation easing; optional mina.[ease]; defaults to easeout
		// fromLength: length at which to start; optional int; defaults to 0
		// offset: x and y offset of element; optional object; defaults to {x: 0, y: 0}
		function moveAlongPath(snapElement, snapPath, dur, ease, fromLength, offset) {
			var dot, toLength;
			if (!fromLength) {
				fromLength = 0;
			}
			if (!ease) {
				ease = mina.easeout;
			}
			if (! offset) {
				offset = {};
			}
			if (!offset.x) {
				offset.x = 0;
			}
			if (!offset.y) {
				offset.y = 0;
			}
			toLength = Snap.path.getTotalLength(snapPath);
			Snap.animate(fromLength, toLength, function(l) {
				dot = snapPath.getPointAtLength(l);
				snapElement.attr({
					x: dot.x + offset.x,
					y: dot.y + offset.y
				});
			}, dur, ease);
		}
		
		// snapElement: snap svg element
		// snapPath: snap svg path (not a path string)
		// dur: duration in millis
		// ease: animation easing; optional mina.[ease]; defaults to easeout
		// fromLength: length at which to start; optional int; defaults to 0
		// offset: x and y offset of element; optional object; defaults to {x: 0, y: 0}
		function moveAlongPathToWindowHeight(snapElement, snapPath, dur, ease, fromLength, offset) {
			var checkY = ($(window).height() - $('#infograph').offset().top) - 10;
			var dot, toLength, hasSubpath;
			if (!fromLength) {
				fromLength = 0;
			}
			if (!ease) {
				ease = mina.easeout;
			}
			if (! offset) {
				offset = {};
			}
			if (!offset.x) {
				offset.x = 0;
			}
			if (!offset.y) {
				offset.y = 0;
			}
			//=======================
	        var i = 0;
	        while (!hasSubpath) {
		        i += 5;
		       	var pt = snapPath.getPointAtLength(i);
		        if (pt.y >= checkY) {
			        hasSubpath = true;
			        toLength = Snap.path.getTotalLength(snapPath.getSubpath(0,i));
		        }
	        }
	        subpathFound = false;
	        //=======================
			Snap.animate(fromLength, toLength, function(l) {
				dot = snapPath.getPointAtLength(l);
				snapElement.attr({
					x: dot.x + offset.x,
					y: dot.y + offset.y
				});
			}, dur, ease);
		}
	
		// snapPath: snap svg path (not a path string)
		// dur: duration in millis
		// toLength: length to draw to; optional, defaults to full length
		// ease: animation easing; optional mina.[ease]; defaults to easeout
		// fromLength: length at which to start; optional int; defaults to 0
		function doodlePath(snapPath, dur, toLength, fromLength, ease) {
			if (!fromLength) {
				fromLength = 0;
			}
			if (!toLength) {
				toLength = Snap.path.getTotalLength(snapPath);
			}
			if (!ease) {
				ease = mina.linear;
			}
			var pathClone = s.path().attr({
				fill: 'transparent',
				stroke: snapPath.node.getAttribute('stroke'),
				strokeWidth: snapPath.node.getAttribute('stroke-width'),
				strokeDasharray: '7 0'
			});
			Snap.animate(fromLength, toLength, function(l) {
				var dot = snapPath.getPointAtLength(l);
				pathClone.attr({
					d: trackPath.getSubpath(0, l)
				});
			}, dur, ease);
		}
	
	});
	
});
