// we wrote this to replace a small section of our svg with actual html elements
// this creates the form control for the calculator
// it's kinda neat though, could handle just about any element you throw at it, and works with resize :)

window.addEventListener('load', function() {	

	var coasterData = 
	[{
			"name": "Batman",
			"feet": "2700"
		},
		{
			"name": "American Eagle",
			"feet": "4650"
		},
		{
			"name": "Demon",
			"feet": "1250"
		},
		{
			"name": "Goliath",
			"feet": "3084"
		},
		{
			"name": "Little Dipper",
			"feet": "700"
		},
		{
			"name": "Raging Bull",
			"feet": "5057"
		},
		{
			"name": "Sprocket Rockets",
			"feet": "680"
		},
		{
			"name": "Superman",
			"feet": "5400"
		},
		{
			"name": "Dark Knight",
			"feet": "1215"
		},
		{
			"name": "Vertical Velocity",
			"feet": "630"
		},
		{
			"name": "Viper",
			"feet": "3458"
		},
		{
			"name": "XFlight",
			"feet": "3000"
	}];

  	var idControl = 0;
	var selects = [];
	var elements = [];
	var svgs = [];
	var boxes = ['swapForNames', 'swapForDistances'];
	
	replaceSVG('div', 'new-calc', ['#calc']);
	replaceSVG('div', 'new-calc-wrapper', ['#calc-wrapper']);
	var answerDiv = replaceSVG('span', 'answers', ['#answer', 'answer']);
	var actionText = replaceSVG('span', 'callToAction', ['#actionCall']);
	var txt = document.createTextNode("A marathon on the Raging Bull? How many rides is that?");
	actionText.appendChild(txt);

	var buttonDiv = replaceSVG('button', 'calculator-button', ['#calculator']);
	var buttonText = document.createTextNode("CALCULATE");
	buttonDiv.appendChild(buttonText);

	var coasterSpanDiv = replaceSVG('span', 'coasterSpan', ['#coaster']);
	var distanceSpanDiv = replaceSVG('span', 'distanceSpan', ['#distance']);
	var coasterText = document.createTextNode("COASTER:");
	var distanceText = document.createTextNode("DISTANCE:");
	coasterSpanDiv.appendChild(coasterText);
	distanceSpanDiv.appendChild(distanceText);

	// refs for these- they could light up on calculation! XD
	var yellow = replaceSVG('div', 'circ-1', ['circ']);
	var green = replaceSVG('div', 'circ-2', ['circ2']);
	var orange = replaceSVG('div', 'circ-3', ['circ3']);
	var red = replaceSVG('div', 'circ-4', ['circ4']);
	var blue = replaceSVG('div', 'circ-5', ['circ5']);

	boxes.forEach(function(box, idx) {
		var cls = '';
		if (idx == 0) {
			cls = 'rollercoasterOptions';
		}
		else {
			cls = 'lengthOptions';
		}
		boxes[idx] = replaceSVG('select', box, [cls]);
	});
	
	// once the ui is set up, do stuff
	data();
	
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// utilities
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	function replaceSVG(elementType, svgId, classes) {
		if (screen.width < 760) {
			svgId += '2';
		}
		var el = document.createElement(elementType);
		var svgEl = document.querySelector('#' + svgId);
		var setTop = document.body.scrollTop + svgEl.getBoundingClientRect().top;
		var setLeft = document.body.scrollLeft + svgEl.getBoundingClientRect().left;
		el.setAttribute('id', 'markup' + idControl);
		document.querySelector('.container').appendChild(el);
		el.style.position = 'absolute';
		el.style.top = setTop + 'px';
		el.style.left = setLeft + 'px';
		el.style.width = svgEl.getBoundingClientRect().width + 'px';
		el.style.height = svgEl.getBoundingClientRect().height + 'px';
		if (classes.length) {
			classes.forEach(function(className, index) {
				if (className.charAt(0) == '#') {
					el.setAttribute('id', className.substring(1));
				}
				else {
					el.classList.add(className);
				}
			});
		}
		if (elementType == 'select') {
			selects.push(el);	
		}
		elements.push(el);
		svgs.push(svgEl);
		idControl++;
		handleResize();
		hideSVG(svgEl);
		return el;
	}
			
	function data() {
		var coasters = coasterData.map(function(val, idx) {
			return val.name;
		});
		var lengths = coasterData.map(function(val, idx) {
			return val.feet;
		});
		makeOptions(coasters, lengths);
		buttonDiv.addEventListener('click', function(evt) {
			if (answerDiv.firstChild != null) {
				answerDiv.firstChild.remove();
			}
			calculate(coasterData);		
		});
	}

	function calculate(arr) {
		var selectedCoaster = boxes[0].value;
		var selectedDistance = boxes[1].value;
		var distanceInFeet;

		switch(selectedDistance) {
			case "5K":
			distanceInFeet = 16404.2;
			break;

			case "10K":
			distanceInFeet = 32808.4;
			break;

			case "Marathon":
			distanceInFeet = 138435;
			break;
		}

		for (var z = 0; z < arr.length; z++) {
				if (selectedCoaster == arr[z].name) {
					var feet = parseInt(arr[z].feet);
					// has to be ceil()
					// floor() would get you almost there, but not to the full distance
					var total = Math.ceil(distanceInFeet/feet);
					var t = document.createTextNode(total + " rides!");
					answerDiv.appendChild(t);
				}
			}
	}
	
	// add coasters as <option> elements for first <select>, then add distance options for the other
	function makeOptions(coasters, lengths) {
		var distances = ['5K', '10K', 'Marathon'];
		coasters.forEach(function(name, index) {
			var opt = document.createElement('option');
			opt.text = name;
			opt.value = name;
			selects[0].options.add(opt);
		});
		distances.forEach(function(string, index) {
			var opt = document.createElement('option');
			var totalDist = 0;
			switch(string) {
				case '5K':
					totalDist = 16404.2;
					break;
				case '10K':
					totalDist = 32808.4;
					break;
				case 'Marathon':
					totalDist = 138435;
					break;
			 // fallback to marathon
				default:
				  string = 'Marathon';
					totalDist = 138435;
					break;
			}
			opt.text = string;
			opt.value = string;
			selects[1].options.add(opt);
		});
		handleResize();
	}
	
	// re-position, re-size elements on window resize
	function handleResize() {
		window.addEventListener('resize', function(evt) {
			elements.forEach(function(element, index) {
				var setTop = document.body.scrollTop + svgs[index].getBoundingClientRect().top;
				var setLeft = document.body.scrollLeft + svgs[index].getBoundingClientRect().left;
				element.style.top = setTop + 'px';
				element.style.left = setLeft + 'px';
				element.style.width = svgs[index].getBoundingClientRect().width + 'px';
				element.style.height = svgs[index].getBoundingClientRect().height + 'px';
			});
		});
	}
	
	// hide the template svg
	function hideSVG(svgEl) {
		svgEl.setAttribute('fill', 'none');
		svgEl.setAttribute('stroke', '#transparent');
	}
	
});