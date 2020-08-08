<script>
	import parseTimerParams from './helpers/parseTimerParams';
	import encodeTimerParams from './helpers/encodeTimerParams';
	import Timebox from './Timebox.svelte';

	const defaultTimerParams = [
	  {
	    label: 'Presentation',
	    duration: 15*60*1000,
	    warning: 2*60*1000
	  },
	  {
	    label: 'Feedback',
	    duration: 2*60*1000,
	    warning: 1*60*1000
	  }
	];

	let timers = parseTimerParams() || defaultTimerParams;

	$: timerParams = encodeTimerParams(timers);

	function updateURL(params) {
		history && history.replaceState({}, "", window.location.pathname + params);
	}

	$: updateURL(timerParams);

</script>

<Timebox bind:timers={timers} />
