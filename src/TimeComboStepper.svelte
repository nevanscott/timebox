<script>
  import pad from './helpers/pad';
  import Stepper from './Stepper.svelte';

  export let time = 60 * 1000;
  export let step = 1;
  export let max = Infinity;
  export let min = 0;

  let minutes = Math.floor(time / 1000 / 60);
  let seconds = Math.floor(time / 1000) % 60;
  $: time = (parseInt(minutes) * 60 + parseInt(seconds)) * 1000;

  minutes = pad(minutes, 2);
  seconds = pad(seconds, 2);

  $: maxInSeconds = Math.floor(max / 1000);
  $: minInSeconds = Math.floor(min / 1000);

  function increment() {
    let timeInSeconds = Math.floor(time / 1000);
    if (timeInSeconds + step <= maxInSeconds) {
      timeInSeconds += step;
    } else {
      timeInSeconds = maxInSeconds;
    }
    minutes = pad(Math.floor(timeInSeconds / 60), 2);
    seconds = pad(Math.floor(timeInSeconds % 60), 2);
  }

  function decrement() {
    let timeInSeconds = Math.floor(time / 1000);
    if (timeInSeconds - step >= minInSeconds) {
      timeInSeconds -= step;
    } else {
      timeInSeconds = minInSeconds;
    }
    minutes = pad(Math.floor(timeInSeconds / 60), 2);
    seconds = pad(Math.floor(timeInSeconds % 60), 2);
  }
</script>

<div class="control">
  <button on:click={ decrement } tabindex="-1">–</button>
  <div class="time">
    <input
      bind:value={minutes}
      type="tel"
      pattern="\d*"
      maxlength="2"
      placeholder="MM"
      on:blur={() => minutes = pad(minutes, 2)}
    >
    <span class="separator">:</span>
    <input
      bind:value={seconds}
      type="tel"
      pattern="\d*"
      maxlength="2"
      placeholder="SS"
      on:blur={() => seconds = pad(seconds, 2)}
    >
  </div>
  <button on:click={ increment } tabindex="-1">+</button>
</div>

<style>

.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-gray-100);
  border: none;
  box-shadow: var(--box-shadow-recessed);
  border-radius: 10px;
  padding: 2px 2px 3px;
}
.control:focus-within {
  box-shadow: 0 0 0 2px blue;
}

.control > * + * {
  margin-left: 4px;
}

.time {
  display: flex;
  align-items: center;
}

input {
  background: transparent;
  border: none;
  width: 3ch;
  font-size: smaller;
  font-weight: 600;
  text-align: center;
}
input:focus {
  outline: none;
  box-shadow: none;
}

.separator {
  font-size: smaller;
  font-weight: 600;
  color: var(--color-gray-500);
}

button {
  font-size: smaller;
  font-weight: 600;
  padding: 2px 6px;
  background: white;
  border: 1px solid rgba(183, 189, 188, 0.4);
  box-sizing: border-box;
  box-shadow: 0px 1px 1px #B7BDBC;
  border-radius: 8px;
  margin: 0;
  transform: translateY(0);
}
button:active {
  color: inherit;
  transform: translateY(1px);
  box-shadow: none;
}


</style>
