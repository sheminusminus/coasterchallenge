(function() {
	// get dom elements
	var menuButton = document.getElementById('menu-button');
	var donateButton = document.getElementById('donate');
	var participateButton = document.getElementById('participate');
	
	// add event listeners
	menuButton.addEventListener('click', toggler);
	donateButton.addEventListener('click', linkTo);
	participateButton.addEventListener('click', linkTo);
	
	// takes dom element as argument
	// gets the target and toggle-class
	function toggler(evt) {
		var targetEl = document.getElementById(evt.target.getAttribute('data-el'));
		var targetClass = evt.target.getAttribute('data-class');
		targetEl.classList.toggle(targetClass);
	}
	
	// takes dom element as argument
	// gets the link-to data
	function linkTo(evt) {
		var link = evt.target.getAttribute('data-href');
		window.location = link;
	}
	
})();