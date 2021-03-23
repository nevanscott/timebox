<script>
  import Stepper from './Stepper.svelte';
  export let time = 60 * 1000;
  export let step = 1;
  export let max = Infinity;
  export let min = 0;

  let minutes = Math.floor(time / 1000 / 60);
  let seconds = Math.floor(time / 1000) % 60;
  $: time = (minutes * 60 + seconds) * 1000;

  $: maxInSeconds = Math.floor(max / 1000);
  $: minInSeconds = Math.floor(min / 1000);

  function increment() {
    let timeInSeconds = Math.floor(time / 1000);
    if (timeInSeconds + step <= maxInSeconds) {
      timeInSeconds += step;
    } else {
      timeInSeconds = maxInSeconds;
    }
    minutes = Math.floor(timeInSeconds / 60);
    seconds = Math.floor(timeInSeconds % 60);
  }

  function decrement() {
    let timeInSeconds = Math.floor(time / 1000);
    if (timeInSeconds - step >= minInSeconds) {
      timeInSeconds -= step;
    } else {
      timeInSeconds = minInSeconds;
    }
    minutes = Math.floor(timeInSeconds / 60);
    seconds = Math.floor(timeInSeconds % 60);
  }
</script>

<div class="control">
  <button on:click={ decrement }>-</button>
  <div>
    <input
      bind:value={minutes}
      type="tel"
      pattern="\d*"
      maxlength="2"
      placeholder="MM"
    >
    :
    <input
      bind:value={seconds}
      type="tel"
      pattern="\d*"
      maxlength="2"
      placeholder="SS"
    >
  </div>
  <button on:click={ increment }>+</button>
</div>

<style>

.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-gray-100);
  border: 1px solid rgba(0, 0, 0, 0.01);
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 2px;
}
.control:focus-within {
  box-shadow: 0 0 0 2px blue;
}

input {
  background: transparent;
  border: none;
  width: 2em;
  font-size: smaller;
  font-weight: 600;
  text-align: right;
}
input:focus {
  outline: none;
}

button {
  font-size: smaller;
  font-weight: 600;
  padding: 4px 8px;
  background: white;
  border: 1px solid rgba(183, 189, 188, 0.4);
  box-sizing: border-box;
  box-shadow: 0px 1px 1px #B7BDBC;
  border-radius: 8px;
}

</style>
