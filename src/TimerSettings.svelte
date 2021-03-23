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
  <div class="duration">
    <TimeSplitStepper bind:time={duration} />
  </div>
  <div class="warning">
    <label>Warn&nbsp;at</label>
    <TimeComboStepper bind:time={warning} step={15} max={duration} />
  </div>
</div>

<style>

input {
  width: 10em;
  background: var(--color-gray-100);
  border: 1px solid rgba(0, 0, 0, 0.01);
  box-sizing: border-box;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 8px 12px;
  font-weight: 600;
}

.layout {
  display: grid;
  grid-template-rows: auto auto auto;
  grid-gap: 12px;
}

.warning {
  display: flex;
  align-items: center;
}
.warning label {
  margin-right: 12px;
}

</style>
