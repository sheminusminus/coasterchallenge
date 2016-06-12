/*====================================================
	greensock animations http://greensock.com/
	licensed to emily kolar (developer on this project) as of April 2016
	plus permission to use for soill coaster challenge
	thank you jack!
====================================================*/


$(document).ready(function() {
	if (window.innerWidth < 760) {
		return null;
	}
	//==============================
	// animation control variable
	var animEvent = 0;
	//==============================

	//==============================
	// window width and height
	//==============================
	var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	var wh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

	//==============================
	//triggers
	//==============================
	var boardTrigger1 = document.querySelector('#boardTrigger1').getBBox().y;
	var boardTrigger2 = document.querySelector('#boardTrigger2').getBBox().y;
	var peakTrigger = document.querySelector('#nearpeakclouds').getBBox().y;
	var valleyTrigger = document.querySelector('#valleyTrigger').getBBox().y;
	var nessieTrigger = document.querySelector('#foreground3').getBBox().y;
	var perchedTrigger = document.querySelector('#perched').getBBox().y - 20;
	var carouselTrigger = document.querySelector('#carousel').getBBox().y + 100;
	var sunTrigger = document.querySelector('#sun').getBBox().y + 100;
	var blinkTrigger = document.querySelector('#concessions').getBBox().y;

	//==============================
	// timelines, set start positions, set loop iterations
	//==============================
	var cloudsTimeline = new TimelineMax({repeat: -1}); // infinite
	var friendsTimeline = new TimelineMax({repeat: -1}); //infinite
	var waterTimeline = new TimelineMax({repeat: -1}); // infinite
	var triggerTimeline = new TimelineLite(); // timelinelite can't set to repeat, use for simple anims
	var talkingTl = new TimelineMax({repeat: -1});
	var eyes = new TimelineMax({repeat: -1, yoyo: true});

	//==============================
	// animations
	//==============================

	//~~~~~~~~~~~~~~~~
	// handle clouds
	//~~~~~~~~~~~~~~~~
	cloudsTimeline.set('#nearclouds', {
		x: '-=1100'
	})
	.set('#farclouds', {
		x: '-=1100'
	})
	.staggerTo(['#nearclouds1', '#nearclouds0', '#farclouds', '#nearclouds2'], 28 , {
		x: '+=2200'
	}, 3);

	//~~~~~~~~~~~~~~~~
	// handle nessie, flying pter
	//~~~~~~~~~~~~~~~~
	friendsTimeline.set('#flying', {
		scale: 0.4,
		x: ww
	})
	.to('#flying', 2, {
		scale: 1,
		x: -250,
		y: '+=80'
	})
	.to('#flying', 4, {
		y: -300,
		x: -ww/1.2
	})
	.staggerTo(['#endbody', '#middle', '#head'], 4, {
		x: '-=10',
		y: '-=5'
	}, 1)
	.staggerTo(['#head', '#middle', '#endbody'], 4, {
		x: 0,
		y: 0
	}, 1);

	//~~~~~~~~~~~~~~~~
	// handle water
	//~~~~~~~~~~~~~~~~
	waterTimeline.staggerTo(['#water0', '#water4', '#water2', '#water1', '#water3'], 8, {
		x: '-=20',
		y: '-=5'
	}, 1.2)
	.staggerTo(['#water0', '#water4', '#water2', '#water1', '#water3'], 8, {
		x: '+=20',
		y: '+=5'
	}, 1.2);
	
	//
	// handle all the blinking trees
	//
	
	eyes.to('#lidL', 0.5, {
		morphSVG: '#morphlidL'
	})
	.to('#lidR', 0.5, {
		morphSVG: '#morphlidR'
	})
	.to('#lidL_1_', 1, {
		morphSVG: '#morphlidL_1_'
	})
	.to('#lidR_1_', 1, {
		morphSVG: '#morphlidR_1_'
	})
	.to('#lidL_2_', 1, {
		morphSVG: '#morphlidL_2_'
	})
	.to('#lidR_2_', 1, {
		morphSVG: '#morphlidR_2_'
	})
	.to('#lidL_3_', 1, {
		morphSVG: '#morphlidL_3_'
	})
	.to('#lidR_3_', 1, {
		morphSVG: '#morphlidR_3_'
	})
	.to('#lidL_4_', 1, {
		morphSVG: '#morphlidL_4_'
	})
	.to('#lidR_4_', 1, {
		morphSVG: '#morphlidR_4_'
	})
	.to('#lidL_5_', 1, {
		morphSVG: '#morphlidL_5_'
	})
	.to('#lidR_5_', 1, {
		morphSVG: '#morphlidR_5_'
	})
	.to('#lidL_6_', 1, {
		morphSVG: '#morphlidL_6_'
	})
	.to('#lidR_6_', 1, {
		morphSVG: '#morphlidR_6_'
	})
	.to('#lidL_7_', 1, {
		morphSVG: '#morphlidL_7_'
	})
	.to('#lidR_7_', 1, {
		morphSVG: '#morphlidR_7_'
	})
	.to('#lidL_8_', 1, {
		morphSVG: '#morphlidL_8_'
	})
	.to('#lidR_8_', 1, {
		morphSVG: '#morphlidR_8_'
	})
	.to('#lidL_9_', 1, {
		morphSVG: '#morphlidL_9_'
	})
	.to('#lidR_9_', 1, {
		morphSVG: '#morphlidR_9_'
	})
	.to('#lidL_10_', 1, {
		morphSVG: '#morphlidL_10_'
	})
	.to('#lidR_10_', 1, {
		morphSVG: '#morphlidR_10_'
	})
	.to('#lidL_11_', 1, {
		morphSVG: '#morphlidL_11_'
	})
	.to('#lidR_11_', 1, {
		morphSVG: '#morphlidR_11_'
	})
	.to('#lidL_12_', 1, {
		morphSVG: '#morphlidL_12_'
	})
	.to('#lidR_12_', 1, {
		morphSVG: '#morphlidR_12_'
	})
	.to('#lidL_13_', 1, {
		morphSVG: '#morphlidL_13_'
	})
	.to('#lidR_13_', 1, {
		morphSVG: '#morphlidR_13_'
	})
	.to('#lidL_14_', 1, {
		morphSVG: '#morphlidL_14_'
	})
	.to('#lidR_14_', 1, {
		morphSVG: '#morphlidR_14_'
	})
	.to('#lidL_15_', 1, {
		morphSVG: '#morphlidL_15_'
	})
	.to('#lidR_15_', 1, {
		morphSVG: '#morphlidR_15_'
	});

	
	//~~~~~~~~~~~~~~~~
	// handle treehead, sprinkles, lochy
	//~~~~~~~~~~~~~~~~

	TweenMax.to('#sprkl1', 2, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl2', 4, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl3', 6, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl4', 8, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl5', 2, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl6', 4, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl7', 6, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl8', 8, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl9', 2, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#sprkl10', 4, {rotation:360, repeat:-1, transformOrigin:"50% 50%"});
	TweenMax.to('#mama', 0.8, {rotation:"-=10", yoyo:true, repeat:-1, transformOrigin:"right bottom"});
	TweenMax.to('#jaw', 0.4, {y: '+=6.5', yoyo:true, repeat:-1, });


	//==============================
	// animation loop function: checks donorsaur's position every 100ms and update animations
	//==============================
	var t = setInterval(function() {
		// get bounding box's y positions, use as function arg
		var dy = document.querySelector('#dinoGroup').getBBox().y;
		checkDino(dy);
	}, 100);

	//==============================
	// function called by animation loop
	//==============================
	function checkDino(y) {

		if (animEvent == 0 && y > sunTrigger) {
			animEvent++;
			sun();
		}

		if (animEvent == 1 && y < sunTrigger) {
			animEvent--;
		}

		if (animEvent == 1 && y > perchedTrigger) {
			animEvent++;
			perchedPter();
		}

		if (animEvent == 2 && y < perchedTrigger) {
			animEvent--;
		}

		if (animEvent == 2 && y > blinkTrigger) {
			animEvent++;
// 			blink();
		}

		if (animEvent == 3 && y < blinkTrigger) {
			animEvent--;
		}

		if (animEvent == 3 && y > peakTrigger) {
			animEvent++;
			peakClouds();
		}

		if (animEvent == 4 && y < peakTrigger) {
			animEvent--;
		}

		if (animEvent == 4 && y > valleyTrigger) {
			animEvent++;
			valleyClouds();
		}

		if (animEvent == 5 && y < valleyTrigger) {
			animEvent--;
		}

		if (animEvent == 5 && y > nessieTrigger) {
			animEvent++;
			nessie();
		}
		if (animEvent == 6 && y < nessieTrigger) {
			animEvent--;
		}

		if (animEvent == 6 && y > carouselTrigger) {
			animEvent++;
			ponies();
		}

		if (animEvent == 7 && y < carouselTrigger) {
			animEvent--;
		}
	}

	function sun() {
		triggerTimeline.to('#halo', 1, {
			opacity: 0.4,
			scale: 1.2,
			x: '-=20',
			y: '-=20'
		})
		.to('#halo', 1, {
			opacity: 0.1,
			scale: 1,
			x: '+=20',
			y: '+=20'
		});
	}

	function perchedPter() {
		triggerTimeline.to('#perched', 0.4, {
			y: '-=20'
		})
		.to('#perched', 0.4, {
			y: '+=20'
		})
		.to('#perched', 0.4, {
			y: '-=20'
		})
		.to('#perched', 0.4, {
			y: '+=20'
		})
		.to('#perched', 0.4, {
			y: '-=20'
		})
		.to('#perched', 0.4, {
			y: '+=20'
		});
	}

	function blink() {
		triggerTimeline.to('#lidR', 0.1, {
			morphSVG: '#morph_lidR'
		})
		.to('#lidL', 0.1, {
			morphSVG: '#morph_lidL'
		})
		.to('#lidR', 0.2, {
			morphSVG: '#lidR'
		})
		.to('#lidL', 0.2, {
			morphSVG: '#lidL'
		})
		.to('#lidR2', 0.1, {
			morphSVG: '#morph_lidR2'
		})
		.to('#lidL2', 0.1, {
			morphSVG: '#morph_lidL2'
		})
		.to('#lidR2', 0.2, {
			morphSVG: '#lidR2'
		})
		.to('#lidL2', 0.2, {
			morphSVG: '#lidL2'
		})
		.to('#lidR3', 0.1, {
			morphSVG: '#morph_lidR3'
		})
		.to('#lidL3', 0.1, {
			morphSVG: '#morph_lidL3'
		})
		.to('#lidR3', 0.2, {
			morphSVG: '#lidR3'
		})
		.to('#lidL3', 0.2, {
			morphSVG: '#lidL3'
		});
	}

	function peakClouds() {
		triggerTimeline.to(['#nearpeak0', '#nearpeak1'], 0.4, {
			opacity: '-=0.4',
			scaleX: 1.2,
			scaleY: 0.6,
			x: '-=15'
		})
		.to(['#nearpeak0', '#nearpeak1'], 0.4, {
			opacity: '+=0.3',
			scaleX: 1,
			scaleY: 1,
			x: '+=15'
		});
	}

	function valleyClouds() {
		triggerTimeline.staggerTo(['#valleyclouds0', '#valleyclouds1', '#valleyclouds2'], 0.4, {
			scaleX: 1.5,
			scaleY: 0.5,
			x: '-=60'
		}, 0.1)
		.to(['#valleyclouds0', '#valleyclouds1', '#valleyclouds2'], 1.2, {
			scaleX: 1,
			scaleY: 1,
			x: '+=60'
		});
	}

	function nessie() {
		triggerTimeline.to("#endbody", 0.3, {
			morphSVG:"#wave"
		})
		.to('#endbody', 0.3, {
			morphSVG: '#endbody'
		})
		.to("#endbody", 0.3, {
			morphSVG:"#wave"
		})
		.to('#endbody', 0.3, {
			morphSVG: '#endbody'
		});
	}

	function ponies() {
		triggerTimeline.to('#ponyR', 1.4, {
			y: '-=30'
		})
		.to('#ponyR', 1.4, {
			y: '+=30'
		})
		.to('#ponyL', 1.4, {
			y: '-=30'
		})
		.to('#ponyL', 1.4, {
			y: '+=30'
		})
		.to('#ponyM', 1.4, {
			y: '-=30'
		})
		.to('#ponyM', 1.4, {
			y: '+=30'
		});
	}


});
