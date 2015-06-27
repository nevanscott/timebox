var timers = [
  {
    label: "Presentation",
    minutes: 1,
    warning: {
      minutes: .75
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
  this.step();
};
Timer.prototype.step = function(){
  var that = this;
  printTime(this.remaining, '#remaining');
  printTime(this.elapsed, '#elapsed');
  if(this.remaining > 0) {
    if(this.warning && this.remaining <= this.warning) {
      $('body').attr('class', 'warning');
    }
    this.elapsed++;
    this.remaining--;
    this.t = setTimeout(function(){ that.step(); }, 1000);
  } else {
    $('body').attr('class', 'stop');
  }
};

var myTimebox = new Timebox(timers);
myTimebox.start();

$('.time').on('click', function(){
	$('.time').removeClass('focus');
	$(this).addClass('focus');
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