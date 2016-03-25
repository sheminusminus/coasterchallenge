var currentTour = 0;

var introLeg =  {
    id: "intro-leg",
    steps: [
      {
        target: document.querySelector("#bubble1"),
        title: "Welcome to the Coaster Challenge!",
        content: "Hey there! Here's some info we can discuss together.",
        placement: "top",
        arrowOffset: 0,
        yOffset: 0,
        showCTAButton: true,
        ctaLabel: 'Take Me Through It',
        onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg2);
       	}
      }
    ],
    showPrevButton: false,
    //scrollDuration: 500,
    i18n: {
	    doneBtn: 'Got it, thanks!'
	}
  };

var leg2 =  {
    id: "leg-2",
    steps: [
      {
        target: document.querySelector("#bubble2"),
        title: "Where to Begin?",
        content: "Not sure exactly, because I don't know how to write copy!",
        placement: "right",
        xOffset: 50,
        showCTAButton: true,
        ctaLabel: 'Take Me Through It',
	    scrollDuration: 300,
        onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg3);
       	}
      }
    ],
    scrollTopMargin: 200,
    showPrevButton: false,
    i18n: {
	    doneBtn: 'Got it, thanks!'
	}
  };
  
  var leg3 = {
	  id: "leg-3",
	  steps: [
	  {
        target: document.querySelector("#bubble3"),
        placement: "left",
        title: "But even so...",
        content: "This should be a pretty fun ride-along.",
        delay: 200,
        xOffset: -50,
        showCTAButton: true,        
        ctaLabel: 'Take Me Through It',
        onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg4);
       	}
      }
    ],
    showPrevButton: false,
    scrollTopMargin: 200,
    i18n: {
	    doneBtn: 'Got it, thanks!'
	}
  };



  var leg4 = {
	  id: "leg-4",
	  steps: [
	  {
        target: document.querySelector("#bubble4"),
        placement: "left",
        title: "And if we get lost...",
        content: "The next thing will point the way?",
        delay: 100,
        yOffset: - 100,
        showCTAButton: true,
        ctaLabel: 'Take Me Through It',
        onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg5);
       	}
      }
    ],
    showPrevButton: false,
    scrollDuration: 1500,
    scrollTopMargin: 100,
    i18n: {
	    doneBtn: 'Got it, thanks!'
	}
  };

  
  var leg5 = {
	  id: "leg-5",
	  steps: [
	  {
        target: document.querySelector("#bubble5"),
        placement: "top",
        title: "Nailed it!",
        content: "'Cause we're in this together, man."   
      }
    ],
    showPrevButton: false,
    scrollTopMargin: 200,
    i18n: {
	    doneBtn: 'Awesome!'
	}
  };

  
  
  window.addEventListener('load', function() {
		hopscotch.endTour([true]);
		hopscotch.startTour(introLeg);
		var animEvent = 0;
		var dinogroup = document.querySelector('#dinoGroup');
		var tl = new TimelineMax();
		var bigCloudR = document.querySelector('#big-cloud-r');
		var bigCloudL = document.querySelector('#big-cloud-l');
		var r1 = document.querySelector('#cloudR');
		var r2 = document.querySelector('#cloudR2');
		var r3 = document.querySelector('#cloudR3');
		var l1 = document.querySelector('#cloudL');
		var l2 = document.querySelector('#cloudL2');
		var l3 = document.querySelector('#cloudL3');
		var l4 = document.querySelector('#cloudL4');
		var puffR = document.querySelector('#cloudPuffR');
		var puffL = document.querySelector('#cloudPuffL');
		var puffC = document.querySelector('#cloudPuffC');
		var cloudC = document.querySelector('#cloudC');
		var cloudRT = document.querySelector('#cloudRtiny');
		var b2 = document.querySelector('#bubble2').offsetTop;
		var b3 = document.querySelector('#bubble3').offsetTop - 150;
		var b4 = document.querySelector('#bubble4').offsetTop - 150;
		var b5 = document.querySelector('#bubble5').offsetTop - 150;

		var animLoop = setInterval(function() {
			loop();
		}, 300);
	
	function loop() {
		
		var dy = dinoGroup.getBBox().y;
					
			if (animEvent == 0 && dy >= b2) {	
				animEvent++;		
				tl.to([bigCloudL, l2, l4, puffL, l1, l3, puffC], 1, {
					x: -200
				}).staggerTo([bigCloudR, r2, puffR, cloudRT, r1, r3, cloudC], 1, {
					x: 400
				}, '-=0.1');
				hopscotch.endTour([true]); 
				hopscotch.startTour(leg2);
			}
			
			if (animEvent == 1 && dinogroup.getBBox().y >= b3) {	
				animEvent++;		
				hopscotch.endTour([true]);

				hopscotch.startTour(leg3);
			}

			if (animEvent == 2 && dinogroup.getBBox().y >= b4) {	
				animEvent++;		
				hopscotch.endTour([true]);
				hopscotch.startTour(leg4);
			}
			
			if (animEvent == 3 && dinogroup.getBBox().y >= b5) {	
				animEvent++;		
				hopscotch.endTour([true]);
				hopscotch.startTour(leg5);
			}
			


		}
	
	});
	
