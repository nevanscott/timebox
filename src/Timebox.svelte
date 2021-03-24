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
        timer.elapsed = Math.min(timer.elapsed + elapsed, timer.duration);
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

  function handleKeyPress(e) {
    if(e.code === "Space" && document.activeElement === document.body) {
      if(timers.find(timer => timer.playing)) {
        timers.map(timer => {
          timer.paused = timer.playing;
          timer.playing = false;
        });
      } else if(timers.find(timer => timer.paused)) {
        timers.map(timer => {
          timer.playing = timer.paused;
          timer.paused = false;
        });
      } else {
        timers[0].playing = true;
      }
      timers = timers;
    } else if (e.code === "Escape") {
      document.activeElement.blur();
    }
    console.log(e);
  }
</script>

<svelte:window on:keypress={handleKeyPress}/>

<div class="page-header">
  <header role="banner">Timebox</header>
  <Controls bind:autoplay={autoplay} />
</div>

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
      counter={i+1}
    />
  {/each}
  <button class="new-timer" on:click={addTimer}><span class="icon">+</span> New Timer</button>
</div>

<style>

.timers {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 1fr;
	grid-gap: var(--space);
}

.new-timer {
  background: transparent;
  border: dashed 4px var(--color-gray-300);
  border-radius: 16px;
  color: var(--color-gray-500);
  font-weight: 600;
  cursor: pointer;
}

.icon {
  color: var(--color-gray-300);
  font-size: larger;
  font-weight: 800;
}

.page-header {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
}

[role=banner] {
  color: var(--color-gray-300);
  cursor: default;
  font-weight: 600;
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }

</style>
