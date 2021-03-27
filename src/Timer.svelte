<script>
  import formatTime from './helpers/formatTime';
  import { createEventDispatcher } from 'svelte';
  import PlayButton from './PlayButton.svelte';
  import TimerSettings from './TimerSettings.svelte';
  import { fly } from 'svelte/transition';

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
  transition:fly="{{ y: 4, duration: 250 }}"
>
  <div class="layout">
    <div>
      <PlayButton
        on:click={toggleTimer}
        finished={finished}
        playing={playing}
        warning={warned}
        completed={completed}
        {duration}
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
  {#if elapsed === 0}
    <button
      class="remove action"
      on:click|stopPropagation={remove}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.24408 5.24408C5.56952 4.91864 6.09715 4.91864 6.42259 5.24408L10 8.8215L13.5774 5.24408C13.9029 4.91864 14.4305 4.91864 14.7559 5.24408C15.0814 5.56952 15.0814 6.09715 14.7559 6.42259L11.1785 10L14.7559 13.5774C15.0814 13.9029 15.0814 14.4305 14.7559 14.7559C14.4305 15.0814 13.9029 15.0814 13.5774 14.7559L10 11.1785L6.42259 14.7559C6.09715 15.0814 5.56952 15.0814 5.24408 14.7559C4.91864 14.4305 4.91864 13.9029 5.24408 13.5774L8.8215 10L5.24408 6.42259C4.91864 6.09715 4.91864 5.56952 5.24408 5.24408Z" fill="currentColor"/>
      </svg>
    </button>
  {:else if !playing}
    <button
      class="reset action"
      on:click|stopPropagation={reset}
    >Reset</button>
  {/if}
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
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding-left: 4px;
}

.label {
  font-weight: 650;
}

.times {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
}
.times > * + * {
  margin-block-start: 8px;
}

.time {
	font-weight: 700;
	line-height: 1;
	transition: font-size 250ms;
  cursor: pointer;
}
.focus {
	font-size: 4em;
}

.time:not(.focus) {
  color: var(--color-gray-500);
}
.time:not(.focus):hover {
  color: var(--color-gray-700);
}

</style>
