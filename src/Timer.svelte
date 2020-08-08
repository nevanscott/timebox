<script>
  import formatTime from './helpers/formatTime';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let label = "Timer";
  export let duration = 5 * 60 * 1000;
  export let warning = 2 * 60 * 1000;
  export let elapsed = 0;
  export let playing = false;

  $: elapsedSeconds = Math.floor(elapsed / 1000);
  $: remaining = duration - elapsed;
  $: remainingSeconds = Math.ceil(remaining / 1000);
  $: finished = (remainingSeconds <= 0);
  $: warned = (remaining <= warning);

  let countDown = true;
  $: countUp = !countDown;

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
    playing = true;
  }

  function pause() {
    playing = false;
  }

  function reset() {
    playing = false;
    finished = false;
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
  on:click={toggleTimer}
>
  <input
    bind:value={label}
    type="text"
    class="label"
    on:click|stopPropagation
    placeholder="Timer"
  >
  <button
    class="remove"
    on:click|stopPropagation={remove}
  >&times;</button>
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
</article>

<style>

.timer {
  position: relative;
}

.remove {
  background: none;
  border: none;
  font-size: inherit;
  font-weight: bold;
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 1.5em;
  width: 1.5em;
  line-height: 1;
  border-radius: 1.5em;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.remove:hover {
  background: rgba(0,0,0,0.25);
}

</style>
