window.addEventListener('load', function() {
	var dinoCar = document.querySelector('#dinoCar');
	console.log(dinoCar.getBBox());
/*
	var cloudInt = setInterval(function() {
		if (dinoCar)
	}, 500);
*/
	var bigCloudR = document.querySelector('#big-cloud-r');

	var tl = new TimelineMax();
	
	console.log(tl);

	tl.set(bigCloudR, {
		x: 0
	});
	

	
	tl.to(bigCloudR, 1, {
	   x: 300,
	});
});