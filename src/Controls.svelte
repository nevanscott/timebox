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

<style>

.controls {
	margin-bottom: var(--space);
	display: flex;
	justify-content: flex-end;
}

.toggle {
	display: flex;
	align-items: center;
  cursor: pointer;
}
.toggle > * + * {
	margin-left: 8px;
}

label {
  font-weight: 600;
}

[type=checkbox] ~ .control {
	--track: 20px;
	--control: calc(var(--track) - 4px);
	display: inline-block;
	width: 2.25em;
	height: 1em;
	position: relative;
}
[type=checkbox] ~ .control::before {
	content: '';
	height: var(--track);
	width: 100%;
	position: absolute;
	top: 50%;
	margin-top: calc(var(--track) / -2);
	background: var(--color-gray-300);
	border-radius: calc(var(--track) / 2);
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.05);
}
[type=checkbox]:checked ~ .control::before {
  background: var(--color-blue);
}
:focus-within .control::before {
  box-shadow:
    inset 0px 1px 1px rgba(0, 0, 0, 0.05),
    0 0 0 2px blue;
}

[type=checkbox] ~ .control::after {
	content: '';
	height: var(--control);
	width: var(--control);
	position: absolute;
	top: 50%;
	margin-top: calc(var(--control) / -2);
	margin-left: calc(calc(var(--control) - var(--track)) / -2);
	margin-right: 0;
	right: auto;
	background: white;
	border-radius: calc(var(--control) / 2);
	left: 0;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}
[type=checkbox]:checked ~ .control::after {
	left: auto;
	margin-left: 0;
	right: 0;
	margin-right: calc(calc(var(--control) - var(--track)) / -2);
}

</style>
