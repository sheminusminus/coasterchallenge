/*
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
	}],
	showPrevButton: false,
	scrollDuration: 2000,
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
		scrollDuration: 1000,
		onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg3);
		}
	}],
	scrollTopMargin: 300,
	scrollDuration: 2000,
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
	}],
	showPrevButton: false,
	scrollTopMargin: 300,
	scrollDuration: 2000,
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
	}],
	showPrevButton: false,
	scrollDuration: 2000,
	scrollTopMargin: 300,
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
		title: "And if we run out of made-up content?",
		content: "It's okay, because these messages don't matter yet.",   
		delay: 100,
		//yOffset: - 100,
		showCTAButton: true,
		ctaLabel: 'Take Me Through It',
		onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg6);
		}
	}],
	showPrevButton: false,
	scrollDuration: 2000,
	scrollTopMargin: 200,
	i18n: {
		doneBtn: 'Got it, thanks!'
	}
};

var leg6 = {
	id: "leg-6",
	steps: [
	{
		target: document.querySelector("#bubble6"),
		placement: "top",
		title: "Nailed it!",
		content: "'Cause we're in this together, man."   
		}],
	showPrevButton: false,
	scrollDuration: 2000,
	i18n: {
		doneBtn: 'Awesome!'
	}
};
*/

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();

function nil(x) { return typeof(x) == undefined || x == null; }
function is(x) { return !nil(x); }

function rad2deg(x) { return x*360/(2*3.1415926); }
function lerp(a,b,t) { return a+t*(b-a); }

function V2(pt) { if (pt.cx) { return [pt.cx,pt.y2]; } if (pt.getBBox) { return V2(pt.getBBox()); } if (pt.x) { return [pt.x, pt.y] }; return pt; }

function V2dot(A,B) { return A[0]*B[0]+A[1]*B[1]; }
function V2len(A) { return Math.sqrt(V2dot(A,A)); }
function V2add(A,B) { return [A[0]+B[0],A[1]+B[1]]; }
function V2sub(A,B) { return [A[0]-B[0],A[1]-B[1]]; }
function V2mul(s,A) { return [s*A[0],s*A[1]]; }
function V2lerp(A,B,t) { return [lerp(A[0],B[0],t), lerp(A[1],B[1],t)]; }
function V2mid(A,B) { return V2lerp(A,B,0.5); }
function V2dist(A,B) { return V2len(V2sub(B,A)); }
function V2cross(A,B) { var C = V2sub(B,A); return [-C[1],C[0]] }
function V2rot(A,B) { var C = V2cross(A,B); return -Math.atan2(C[0],C[1]); }

function on(track, x) { return V2(track.getPointAtLength(x)); }
function bbox(e) { var bb = e.getBBox(); return [bb.x,bb.y,bb.x2,bb.y2]; }

function YPos() { return window.pageYOffset || window.scrollY; }
function YMax() {
// http://stackoverflow.com/questions/17688595/finding-the-maximum-scroll-position-of-a-page
	return Math.max(
		document.body.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight) - window.innerHeight;
}

// illustrator sometimes appends _1_ to IDs for mysterious reasons.
function sel(s, name) {
	if (name[0] != '#') { name = '#' + name; }
	return s.select(name+'_1_') || s.select(name);
}

function xform(e,Tx,Ty,rot,Rx,Ry) {
	var s = "";
	if (is(Tx))  { s += 't'+Tx+','+Ty; }
	if (is(rot)) { s += 'r'+rot; }
	if (is(Rx))  { s += ','+Rx+','+Ry; }
	// console.log(s);
	return e.transform(s);
}

function Xform(e,T,rot,R) {
	return xform(e,T[0],T[1],rot,R[0],R[1]);
}

function distBetween(e1,e2) {
	return V2len(V2sub(V2(e1), V2(e2)));
}

function cart(e,wheelL,wheelR,track,x) {
	var L = V2(wheelL);
	var R = V2(wheelR);
	var Lpos = on(track, x);
	var Rpos = on(track, x + V2dist(L,R));
	var rot = V2rot(Lpos,Rpos);
	return Xform(e, V2sub(Lpos,L), rad2deg(rot), L);
}


$(document).ready(function() {

	var root = Snap('#infograph');
	Snap.load('svg/scenewithnames4.svg', function(scene) {
		root.append(scene);
		var track = sel(root,'#track');
		var dino = sel(root,'#dinoCar');
		var wheelL = sel(root,'#dinoWheelL');
		var wheelR = sel(root,'#dinoWheelR');
		var dx = -dino.getBBox().x;	
		var dy = -dino.getBBox().y;
		xform(dino, 0, 0);
		xform(wheelL, dx, dy);
		xform(wheelR, dx, dy);
	
		// Snap.animate(0, track.getTotalLength(), function(l) {
		//   cart(dino,wheelL,wheelR,track,l);
		// }, 30000, mina.bounce);	
	
		var start = new Date().getTime();
		var t=0,dt=0,now=start,time;
		var fps=0,fpsSec=0,fpsCount=0;
		
		var u,uChase=0;
			
		function updateT() {
			now = new Date().getTime();
			dt = now - (time || now);
			t = now - start;
			time = now;
			t /= 1000.0;
			dt /= 1000.0;
		}
	
		function updateFPS() {
			var sec = Math.floor(t);
			if (sec != fpsSec) {
				fpsSec = sec;
				fps = fpsCount;
				fpsCount = 0;
				//console.log("fps: " + fps);
			} else {
				++fpsCount;
			}
		}
	
		function update() {
			updateT();
			updateFPS();
			
			var y=YPos();
			var y2=YMax();
			var yt=y/y2;
			var l=yt*track.getTotalLength();
			
			uChase=l;
			// console.log([u,uChase]);
			
			var k=4.0;
			u=u||uChase;
			u=lerp(u,uChase,k*dt);
			
			cart(dino,wheelL,wheelR,track,u);
		}
	
		function render() {
			update();
			var ctx={root:root};
		}
	
		(function animloop(){
			checkPosition();
			requestAnimFrame(animloop);
			render();
		})();
	});
		
		var lastTriggered;
		var animEvent = 0;
		var dinogroup = document.querySelector('#dinoGroup');
		var tl = new TimelineMax({repeat: 0});
		var t2 = new TimelineMax({repeat: 0});
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
		var cloudStart = r1.getBBox().y;
		var leg2trigger = $('#bubble2').offset().top;
		var leg3trigger = $('#bubble3').offset().top;
		var leg4trigger = $('#bubble4').offset().top;
		var leg5trigger = $('#bubble5').offset().top;
		var leg6trigger = $('#bubble5').offset().top;
		
		var introLeg =  {
			id: "intro-leg",
			steps: [
			{
				target: 'dinoGroup',
				title: "Welcome to the Coaster Challenge!",
				content: "Hey there! Here's some info we can discuss together.",
				placement: "top",
				arrowOffset: 0,
				yOffset: -20,
				xOffset: 30,
				//showCTAButton: true,
				ctaLabel: 'Take Me Through It',
				onCTA: function() {
					hopscotch.endTour([true]);
					hopscotch.startTour(leg2);
				}
			}],
			showPrevButton: false,
			i18n: {
				doneBtn: 'Got it!'
			}
		};
		
		var leg2 =  {
			id: "leg-2",
			steps: [
			{
				target: 'dinoGroup',
				title: "Where to Begin?",
				content: "Not sure exactly, because I don't know how to write copy!",
				placement: "left",
				yOffset: 250,
				xOffset: 200,
				arrowOffset: 0,
				//showCTAButton: true,
				ctaLabel: 'Take Me Through It',
				scrollDuration: 1000,
				onCTA: function() {
					hopscotch.endTour([true]);
					hopscotch.startTour(leg3);
				}
			}],
			scrollTopMargin: 300,
			scrollDuration: 2000,
			showPrevButton: false,
			i18n: {
				doneBtn: 'Got it!'
			}
		};
		
		var leg3 = {
			id: "leg-3",
			steps: [
			{
				target: 'dinoGroup',
				placement: "right",
				title: "But even so...",
				content: "This should be a pretty fun ride-along.",
				delay: 200,
				arrowOffset: 'center',
				xOffset: 60,
				//showCTAButton: true,        
				ctaLabel: 'Take Me Through It',
				onCTA: function() {
					hopscotch.endTour([true]);
					hopscotch.startTour(leg4);
				}
			}],
			showPrevButton: false,
			scrollTopMargin: 300,
			scrollDuration: 2000,
			i18n: {
				doneBtn: 'Got it!'
			}
		};
		
		var leg4 = {
			id: "leg-4",
			steps: [
			{
				target: 'dinoGroup',
				placement: "left",
				title: "And if we get lost...",
				content: "The next thing will point the way?",
				delay: 100,
				yOffset: 100,
				xOffset: 100,
				//showCTAButton: true,
				ctaLabel: 'Take Me Through It',
				onCTA: function() {
					hopscotch.endTour([true]);
					hopscotch.startTour(leg5);
				}
			}],
			showPrevButton: false,
			scrollDuration: 4000,
			scrollTopMargin: 200,
			i18n: {
				doneBtn: 'Got it!'
			}
		};
		
		var leg5 = {
			id: "leg-5",
			steps: [
			{
				target: 'dinoGroup',
				placement: "left",
				title: "And if we run out of made-up content?",
				content: "It's okay, because these messages don't matter yet.",   
				//showCTAButton: true,
				yOffset: 100,
				xOffset: -100,
				arrowOffset: 'center',
				ctaLabel: 'Take Me Through It',
				onCTA: function() {
					hopscotch.endTour([true]);
					hopscotch.startTour(leg6);
				}
			}],
			showPrevButton: false,
			scrollDuration: 2000,
			scrollTopMargin: 500,
			i18n: {
				doneBtn: 'Got it!'
			}
		};
		
		var leg6 = {
			id: "leg-6",
			steps: [
			{
				target: 'dinoGroup',
				placement: "top",
				title: "Nailed it!",
				arrowOffset: 'center',
				content: "'Cause we're in this together, man.",
				delay: 100,
				xOffset: 40
			}],
			showPrevButton: false,
			scrollDuration: 2000,
			scrollTopMargin: 300,
			i18n: {
				doneBtn: 'Awesome!'
			}
		};

		if (hopscotch.getCurrTour()) { hopscotch.endTour([true]); }
		hopscotch.startTour(introLeg);

		
		function checkPosition() {
			var dy = $('#dinoGroup').offset().top;
			var dy2 = $('#dinoGroup').height - dy;
			if (animEvent < 1 && dy >= leg2trigger) {	
				hopscotch.endTour([true]);
				animEvent++;
			
				tl.staggerTo([bigCloudR, r2, puffR, cloudRT, r1, r3, cloudC], 0.4, {
					x: '+=400'
				}, 0.05);
				t2.staggerTo([bigCloudL, l2, l4, puffL, l1, l3, puffC], 0.4, {
					x: '-=200'
				}, 0.05);				
				
				hopscotch.startTour(leg2);
				console.log(leg2trigger);
			}
			if (animEvent < 2 && dy > leg3trigger) {	
				hopscotch.endTour([true]);
				animEvent++;	
				hopscotch.startTour(leg3);
				console.log(leg3trigger);
			}
			if (animEvent < 3 && dy > leg4trigger) {	
				hopscotch.endTour([true]);
				animEvent++;		
				hopscotch.startTour(leg4);
				console.log(leg4trigger);
			}
			if (animEvent < 4 && dy > leg5trigger) {	
				hopscotch.endTour([true]);
				animEvent++;		
				hopscotch.startTour(leg5);
				console.log(leg5trigger);
			}		
			if (animEvent < 5 && dy > (leg5trigger + 550)) {	
				hopscotch.endTour([true]);
				animEvent++;		
				hopscotch.startTour(leg6);
				console.log(leg6trigger);
			}			
		}

});

/*
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
	}],
	showPrevButton: false,
	scrollDuration: 2000,
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
		scrollDuration: 1000,
		onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg3);
		}
	}],
	scrollTopMargin: 300,
	scrollDuration: 2000,
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
	}],
	showPrevButton: false,
	scrollTopMargin: 300,
	scrollDuration: 2000,
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
	}],
	showPrevButton: false,
	scrollDuration: 2000,
	scrollTopMargin: 300,
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
		title: "And if we run out of made-up content?",
		content: "It's okay, because these messages don't matter yet.",   
		delay: 100,
		//yOffset: - 100,
		showCTAButton: true,
		ctaLabel: 'Take Me Through It',
		onCTA: function() {
			hopscotch.endTour([true]);
			hopscotch.startTour(leg6);
		}
	}],
	showPrevButton: false,
	scrollDuration: 2000,
	scrollTopMargin: 200,
	i18n: {
		doneBtn: 'Got it, thanks!'
	}
};

var leg6 = {
	id: "leg-6",
	steps: [
	{
		target: document.querySelector("#bubble6"),
		placement: "top",
		title: "Nailed it!",
		content: "'Cause we're in this together, man."   
		}],
	showPrevButton: false,
	scrollDuration: 2000,
	i18n: {
		doneBtn: 'Awesome!'
	}
};
*/

/*window.addEventListener('load', function() {

	hopscotch.endTour([true]);
	hopscotch.startTour(introLeg);
	var animEvent = 0;
	var dinogroup = document.querySelector('#dinoGroup');
	var tl = new TimelineMax({repeat: 0});
	var t2 = new TimelineMax({repeat: 0});
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
	var cloudStart = r1.getBBox().y;
	var leg2trigger = $('#bubble2').offset().top - 100;
	var leg3trigger = $('#bubble3').offset().top - 100;
	var leg4trigger = $('#bubble4').offset().top - 100;
	var leg5trigger = $('#bubble5').offset().top - 100;
	var leg6trigger = $('#bubble5').offset().top - 100;

	var animLoop = setInterval(function() {
		checkPosition();
	}, 100);

	function checkPosition() {
	
		var dy = $('#dinoGroup').offset().top;
		var dy2 = $('#dinoGroup').height - dy;
		
		if (dy >= leg2trigger && animEvent == 0) {	
			hopscotch.endTour([true]);
			animEvent++;
		
			tl.staggerTo([bigCloudR, r2, puffR, cloudRT, r1, r3, cloudC], 0.4, {
				x: '+=400'
			}, 0.05);
			t2.staggerTo([bigCloudL, l2, l4, puffL, l1, l3, puffC], 0.4, {
				x: '-=200'
			}, 0.05);				
			
			hopscotch.startTour(leg2);
		}
		
		if (animEvent == 1 && dy >= leg3trigger) {	
			hopscotch.endTour([true]);
			animEvent++;	
			hopscotch.startTour(leg3);
		}
		
		if (animEvent == 2 && dy2 >= leg4trigger) {	
			hopscotch.endTour([true]);
			animEvent++;		
			hopscotch.startTour(leg4);
		}
		
		if (animEvent == 3 && dy >= leg5trigger) {	
			hopscotch.endTour([true]);
			animEvent++;		
			hopscotch.startTour(leg5);
		}		
		
		if (animEvent == 4 && dy >= leg6trigger) {	
			hopscotch.endTour([true]);
			animEvent++;		
			hopscotch.startTour(leg6);
		}			
	}


});
*/
