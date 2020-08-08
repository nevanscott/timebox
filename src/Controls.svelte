<script>
  export let autoplay = true;
</script>

<form class="controls">
  <label class="toggle">
    <input bind:checked={autoplay} type="checkbox" class="autoplay vh">
    <span class="control"></span>
    <span class="label">Auto-play</span>
  </label>
</form>
