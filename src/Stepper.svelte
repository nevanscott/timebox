<script>
  import pad from './helpers/pad';

  export let value = 0;
  export let step = 1;
  export let max = Infinity;
  export let min = 0;
  export let placeholder;

  value = pad(value, 2);

  function increment() {
    if (parseInt(value) + step <= max) {
      value = pad(parseInt(value) + step, 2);
    } else {
      value = pad(max, 2);
    }
  }

  function decrement() {
    if(parseInt(value) - step >= min) {
      value = pad(parseInt(value) - step, 2);
    } else {
      value = pad(min, 2);
    }
  }
</script>

<div class="control">
  <input
    bind:value={value}
    type="tel"
    pattern="\d*"
    maxlength="2"
    placeholder={placeholder}
    on:blur={() => value = pad(value, 2)}
  >
  <div class="buttons">
    <button on:click={ increment }>+</button>
    <button on:click={ decrement }>–</button>
  </div>
</div>

<style>

.control {
  display: flex;
  flex-direction: row;
  background: var(--color-gray-100);
  border: none;
  box-shadow: var(--box-shadow-recessed);
  border-radius: 10px;
  padding: 2px 2px 3px;
}
.control:focus-within {
  box-shadow: 0 0 0 2px blue;
}

.buttons {
  display: flex;
  flex-direction: column;
}
.buttons > * + * {
  margin-top: -1px;
}

input {
  background: transparent;
  border: none;
  width: 3ch;
  text-align: center;
  margin-right: 8px;
  font-weight: 600;
  padding-left: 12px;
}
input:focus {
  outline: none;
}

button {
  font-size: smaller;
  font-weight: 600;
  padding: 2px 6px;
  background: white;
  border: 1px solid rgba(183, 189, 188, 0.4);
  box-sizing: border-box;
  box-shadow: 0px 1px 1px #B7BDBC;
  margin: 0;
}
button:first-child {
  border-radius: 8px 8px 0 0;
}
button:last-child {
  border-radius: 0 0 8px 8px;
}

</style>
