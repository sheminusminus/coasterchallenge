window.addEventListener('load', function() {
	
		var s = Snap('#infograph');
	
		Snap.load('svg/pathsokay.svg', function(f) {
			
			var sky = f.select('#Sky');
			var bg = f.select('#layer1');
			var trackPath = f.select('#track');
			var car = f.select('#donorsaur');
						
			var trackLength = trackPath.getTotalLength();
			
			trackPath.attr({
				fill: 'none',
				stroke: '#F27D4F',
				strokeWidth: '1',
				'stroke-dasharray': trackLength,
				'stroke-dashoffset': trackLength
			});
			
			console.log(trackLength);
			
			s.append(sky);
			s.append(bg);
			s.append(trackPath);
			s.append(car);
	
			
			var controller = new ScrollMagic.Controller();
	
			var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
			var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
			
			var scene = new ScrollMagic.Scene({
				triggerElement: '#car-trigger1',
				triggerHook: 0,
				duration: '100%',
				offset: 60
			})
			.addTo(controller)
			.addIndicators()
			.on('update', function(evt) {
				
			})
			.on('enter start', function(evt) {
				animateAlongPath(trackPath, car, 0, 30000);
			})
			.on('end', function(evt) {
				//trackPath.stop();
			})
			.on('progress', function(evt) {
				console.log('progress');
			});


			
			function drawOnPath(path, el) {
				
			};

			function animateAlongPath( path, element, start, dur ) {
				var len = Snap.path.getTotalLength( path );
				Snap.animate( start, len, function( value ) {
			    	var movePoint = Snap.path.getPointAtLength( path, value );
			        element.attr({ x: movePoint.x, y: movePoint.y });
			    }, dur);
			};

			
		});
		
		
});	