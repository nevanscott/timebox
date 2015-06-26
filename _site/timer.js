var total, warning, elapsed, remaining;

start();

function start(){
	total = 8 * 60;
	warning = 2 * 60;
	elapsed = 0;
	remaining = total;
	var minutes = Math.floor(elapsed/60);
	var seconds = elapsed % 60;
	$('#time').text(minutes+':'+pad(seconds,2));
	timer();
}

function timer(){
	setTimeout(function(){
		elapsed++;
		remaining--;
		console.log();
		var minutes = Math.floor(elapsed/60);
		var seconds = elapsed % 60;
		$('#time').text(minutes+':'+pad(seconds,2));
		if(elapsed==total) {
			$('body').attr('class', 'stop');
			$('#time').text('TIME!');
		} else if(remaining<=warning) {
			$('body').attr('class', 'warning');
			timer();
		} else {
			timer();      
		}
	}, 1000);
}

function pad(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}
