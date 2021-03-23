<script>
  import Stepper from './Stepper.svelte';
  export let time = 60 * 1000;

  let minutes = Math.floor(time / 1000 / 60);
  let seconds = Math.floor(time / 1000) % 60;
  $: time = (minutes * 60 + seconds) * 1000;
</script>

<div class="control">
  <Stepper bind:value={minutes} placeholder="MM" />
  <div class="separator">:</div>
  <Stepper bind:value={seconds} placeholder="SS" step={15} max={45} />
</div>

<style>

.control {
  display: flex;
  align-items: center;
}

.separator {
  margin: 0 8px;
  font-weight: 600;
}

</style>
