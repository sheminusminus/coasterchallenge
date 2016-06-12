//~~~~~~~~~~~~~~~~~~
// toggles menu for all pages other than infographic (@index.html)
//~~~~~~~~~~~~~~~~~~
window.addEventListener('load', function() {

	document.querySelector('#menu-button').addEventListener('click', function(evt) {
		document.querySelector('#menu').classList.toggle('open');
		this.classList.toggle('open');
	});

	var faq = document.querySelectorAll('.faq');

	for (var i = 0; i < faq.length; i++) {
		faq[i].addEventListener('click', function() {
			this.firstElementChild.classList.toggle('rotate');
			this.lastElementChild.classList.toggle('show');
		});
	}
});
