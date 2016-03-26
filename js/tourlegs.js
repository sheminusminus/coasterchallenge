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
