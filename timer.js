var Timer = Backbone.Model.extend({
	defaults: function(){
		return {
			label: "Untitled",
			duration: 60,
		};
	}
});

var Timebox = Backbone.Collection.extend({
	model: Timer
});

var TimerView = Backbone.View.extend({
	el: '#timer',
	events: {
		'click .time.focus': 'pause',
		'click .time:not(.focus)': 'focus'
	},
	initialize: function(){
		this.elapsed = 0;
		this.remaining = this.model.get('duration');
		this.isPlaying = false;
		this.listenTo(this.model, 'change', this.render);
	},
	render: function(){
		$('#label').text(this.model.get('label'));
		printTime(this.remaining, '#remaining');
		printTime(this.elapsed, '#elapsed');
	},
	step: function(){
		var timerView = this;
		printTime(this.remaining, '#remaining');
		printTime(this.elapsed, '#elapsed');
		if(this.remaining > 0) {
			if(this.model.get('warning') && this.remaining <= this.model.get('warning')) {
				$('body').attr('class', 'warning');
			}
			this.elapsed++;
			this.remaining--;
			this.t = setTimeout(function(){ timerView.step(); }, 1000);
			this.isPlaying = true;
		} else {
			$('body').attr('class', 'stop');
			this.isPlaying = false;
		}
	},
	pause: function(){
		if(this.isPlaying) {
			this.isPlaying = false;
			clearTimeout(this.t);
		} else {
			this.step();
		}
	},
	focus: function(e){
		this.$('.time').removeClass('focus');
		$(e.currentTarget).addClass('focus');
	}
});

var AppView = Backbone.View.extend({
	el: document,
	events: {
		'keypress': 'pause'
	},
	render: function(){
		this.activeTimer.render();
	},
	addTimer: function(timer){
		this.activeTimer = new TimerView({model: timer});
	},
	pause: function(e){
		if(e.keyCode === 32) {
			this.activeTimer.pause();
		}
	}
});

$(function(){
	var timer = new Timer({
    label: "Presentation",
    duration: 8*60,
    warning: 2*60
	});
	var app = new AppView();
	app.addTimer(timer);
	app.render();
});

// $('#access').click(function(){
// 	$('#timer').toggleClass('blur');
// 	$('#controls').toggleClass('active');
// });
// 
// $('#time_controls').submit(function(){
// 	
// });

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