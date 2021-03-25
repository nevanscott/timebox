<script>
  import TimeSplitStepper from './TimeSplitStepper.svelte';
  import TimeComboStepper from './TimeComboStepper.svelte';

  export let label;
  export let counter;
  export let duration;
  export let warning;

  $: placeholder = "Timer" + (counter ? (" "+counter) : "");
</script>

<div class="layout">
  <div class="label">
    <input
      bind:value={label}
      type="text"
      class="label"
      on:click|stopPropagation
      placeholder={placeholder}
    >
  </div>
  <div class="times">
    <div class="duration">
      <TimeSplitStepper bind:time={duration} />
    </div>
    <div class="warning">
      <label>Warn&nbsp;at</label>
      <div>
        <TimeComboStepper bind:time={warning} step={15} max={duration} />
      </div>
    </div>
  </div>
</div>

<style>

input {
  width: 10em;
  background: var(--color-gray-100);
  border: none;
  box-sizing: border-box;
  box-shadow: var(--box-shadow-recessed);
  border-radius: 10px;
  padding: 8px 12px;
  font-weight: 600;
}
input:focus {
  box-shadow: 0 0 0 2px blue;
}

.layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: -6px;
}

.layout > * {
  padding: 6px;
}

.times {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: -6px -12px;
}
.times > * {
  padding: 6px 12px;
}

.warning {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: -2px -6px;
}
.warning > * {
  padding: 2px 6px;
}
.warning label {
  font-size: smaller;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gray-500);
}

</style>
