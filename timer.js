var timers = [
  {
    label: "Presentation",
    minutes: 15,
    warning: {
      minutes: 2
    },
    countdown: {
      seconds: 20
    }
  },
  {
    label: "Feedback",
    minutes: 5,
    warning: {
      minutes: 1,
    }
  }
];

function Timebox(timers) {
  this.timers = new Array();
  var that = this;
  timers.forEach(function(timer){
    that.timers.push(new Timer(timer));
  });
}
Timebox.prototype.start = function(){
  this.timers[0].start();
};
Timebox.prototype.pause = function(){
  this.timers[0].pause();
};
Timebox.prototype.addTimer = function(timer) {
  
};

function Timer(timer, timebox) {
  this.timebox = timebox;
  this.label = timer.label;
  this.duration = timer.minutes * 60;
  this.elapsed = 0;
  this.remaining = this.duration;
  if(timer.warning) {
    this.warning = timer.warning.minutes * 60;
  }
}
Timer.prototype.start = function(){
  $('#label').text(this.label);
  printTime(this.remaining, '#remaining');
  printTime(this.elapsed, '#elapsed');
};
Timer.prototype.step = function(){
  var timer = this;
  printTime(this.remaining, '#remaining');
  printTime(this.elapsed, '#elapsed');
  if(this.remaining > 0) {
    if(this.warning && this.remaining <= this.warning) {
      $('body').attr('class', 'warning');
    }
    this.elapsed++;
    this.remaining--;
    this.t = setTimeout(function(){ timer.step(); }, 1000);
    this.isPlaying = true;
  } else {
    $('body').attr('class', 'stop');
    this.isPlaying = false;
  }
};
Timer.prototype.pause = function(){
	if(this.isPlaying) {
		this.isPlaying = false;
		clearTimeout(this.t);
	} else {
		this.step();
	}
};

var myTimebox = new Timebox(timers);
myTimebox.start();

$('.time').on('click', function(){
	if($(this).hasClass('focus')) {
		myTimebox.pause();
	} else {
		$('.time').removeClass('focus');
		$(this).addClass('focus');
	}
});

$(document).on('keypress', function(e){
	if(e.keyCode === 32) {
		myTimebox.pause();
	}
});

function printTime(time, target) {
  var minutes = Math.floor(time/60);
  var seconds = time % 60;
  $(target).text(minutes+':'+pad(seconds,2));
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
