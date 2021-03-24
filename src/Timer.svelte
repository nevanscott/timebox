<script>
  import formatTime from './helpers/formatTime';
  import { createEventDispatcher } from 'svelte';
  import PlayButton from './PlayButton.svelte';
  import TimerSettings from './TimerSettings.svelte';

  const dispatch = createEventDispatcher();

  export let label = "Timer";
  export let counter;
  export let duration = 60 * 1000;
  export let warning = 0;
  export let elapsed = 0;
  export let playing = false;

  $: elapsedSeconds = Math.floor(elapsed / 1000);
  $: remaining = duration - elapsed;
  $: remainingSeconds = Math.ceil(remaining / 1000);
  $: finished = (duration > 0 && remainingSeconds <= 0);
  $: warned = (remaining <= warning);
  $: completed = duration ? (elapsed / duration).toFixed(4) : 0;

  let countDown = true;
  $: countUp = !countDown;

  let warningMinutes = Math.floor(warning / 1000 / 60);
  let warningSeconds = Math.floor(warning / 1000) % 60;
  $: warning = (warningMinutes * 60 + warningSeconds) * 1000;

  $: placeholder = "Timer" + (counter ? (" "+counter) : "");

  $: if(finished) {
    playing = false;
    dispatch('finished');
  }

  function handleClickTime(counter) {
    if (counter) {
      toggleTimer();
    } else {
      toggleCountDown();
    }
  }

  function remove() {
    dispatch('remove');
  }

  function toggleCountDown() {
    countDown = !countDown;
  }

  function toggleTimer() {
    if(playing) {
      pause();
    } else if(finished) {
      reset();
    } else {
      play();
    }
  }

  function play() {
    if (duration > 0) {
      playing = true;
    }
  }

  function pause() {
    playing = false;
  }

  function reset() {
    playing = false;
    elapsed = 0;
  }

  function start() {
    if(!playing) {
      reset();
      play();
    }
  }
</script>

<article
  class="timer"
  class:is-playing={playing}
  class:warning={warned}
  class:stop={finished}
>
  {#if elapsed === 0}
    <button
      class="remove action"
      on:click|stopPropagation={remove}
    >&times;</button>
  {:else if !playing}
    <button
      class="reset action"
      on:click|stopPropagation={reset}
    >Reset</button>
  {/if}
  <div class="layout">
    <div>
      <PlayButton
        on:click={toggleTimer}
        finished={finished}
        playing={playing}
        warning={warned}
        completed={completed}
      />
    </div>
    <div>
      {#if elapsed === 0}
        <TimerSettings
          bind:label
          {counter}
          bind:duration
          bind:warning
        />
      {:else}
        <div class="label">{label || placeholder}</div>
        <div class="times">
          <time
            class="remaining time"
            class:focus={countDown}
            on:click|stopPropagation={handleClickTime(countDown)}
          >{ formatTime(remainingSeconds) }</time>
          <time
            class="elapsed time"
            class:focus={countUp}
            on:click|stopPropagation={handleClickTime(countUp)}
          >{ formatTime(elapsedSeconds) }</time>
        </div>
      {/if}
    </div>
  </div>
</article>

<style>

.timer {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 4px 8px rgba(0, 0, 0, 0.05);
  padding: 8px 16px;
  height: 11rem;
}

.action {
  background: none;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: absolute;
  top: 8px;
  right: 8px;
  height: 1.5em;
  line-height: 1.5em;
  border-radius: 1.5em;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: var(--color-gray-500);
}
.action:hover {
  color: var(--color-gray-700);
}

.remove {
  width: 1.5em;
  line-height: 1;
}
.reset {
  font-size: smaller;
  padding: 0 8px;
}

.layout {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.layout > * + * {
  margin-left: 24px;
}

.layout > :first-child {
  padding-left: 8px;
}

.label {
  font-weight: 650;
}

.times {
  height: 4em;
  display: flex;
  align-items: flex-end;
}
.times > * + * {
  margin-inline-start: 8px;
}

.time {
	font-weight: 700;
	line-height: 1;
	transition: font-size 250ms;
  cursor: pointer;
}
.focus {
	font-size: 4em;
  margin-bottom: -0.1em;
}

.time:not(.focus) {
  color: var(--color-gray-500);
}
.time:not(.focus):hover {
  color: var(--color-gray-700);
}

</style>
