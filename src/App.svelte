<script>
	import parseTimerParams from './helpers/parseTimerParams';
	import encodeTimerParams from './helpers/encodeTimerParams';
	import defaultTimer from './defaultTimer';
	import Timebox from './Timebox.svelte';

	const defaultTimerParams = [ defaultTimer ];

	let timers = parseTimerParams() || defaultTimerParams;

	$: timerParams = encodeTimerParams(timers);

	function updateURL(params) {
		history && history.replaceState({}, "", window.location.pathname + params);
	}

	$: updateURL(timerParams);

</script>

<Timebox bind:timers={timers} />
