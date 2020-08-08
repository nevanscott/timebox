<script>
  import encodeTimerParams from './helpers/encodeTimerParams';
  import defaultTimer from './defaultTimer';
  import Controls from './Controls.svelte';
  import Timer from './Timer.svelte';

  export let timers;

  timers.map(timer => {
    timer.elapsed = 0;
    timer.playing = false;
  });

  let autoplay = true;

  let lastUpdate = new Date().getTime();

  let timerInterval = setInterval(updateTimers, 100);

  function updateTimers() {
    const elapsed = new Date().getTime() - lastUpdate;
    timers.map(timer => {
      if (timer.playing) {
        timer.elapsed += elapsed;
      }
    });
    timers = timers;
    lastUpdate = new Date().getTime();
  }

  function handleFinish(i) {
    return function(e) {
      if(autoplay && timers[i+1] && !timers[i+1].playing) {
        timers[i+1].finished = false;
        timers[i+1].elapsed = 0;
        timers[i+1].playing = true;
        timers = timers;
      }
    }
  }

  function remove(i) {
    return function(e) {
      timers.splice(i, 1);
      timers = timers;
    }
  }

  function addTimer() {
    timers = [...timers, {...defaultTimer}]
  }
</script>

<Controls bind:autoplay={autoplay} />

<div class="timers">
  {#each timers as timer, i}
    <Timer
      bind:label={timer.label}
      bind:duration={timer.duration}
      bind:warning={timer.warning}
      bind:elapsed={timer.elapsed}
      bind:playing={timer.playing}
      on:finished={handleFinish(i)}
      on:remove={remove(i)}
    />
  {/each}
  <button class="timer" on:click={addTimer}>+</button>
</div>
