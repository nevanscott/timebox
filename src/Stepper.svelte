<script>
  export let value = 0;
  export let step = 1;
  export let max = Infinity;
  export let min = 0;
  export let placeholder;

  function increment() {
    if (value + step <= max) {
      value = value + step;
    } else {
      value = max;
    }
  }

  function decrement() {
    if(value - step >= min) {
      value = value - step;
    } else {
      value = min;
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
  >
  <div class="buttons">
    <button on:click={ increment }>+</button>
    <button on:click={ decrement }>-</button>
  </div>
</div>

<style>

.control {
  display: flex;
  flex-direction: row;
  background: var(--color-gray-100);
  border: 1px solid rgba(0, 0, 0, 0.01);
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 2px;
}
.control:focus-within {
  box-shadow: 0 0 0 2px blue;
}

.buttons {
  display: flex;
  flex-direction: column;
}

input {
  background: transparent;
  border: none;
  width: 3em;
  text-align: right;
  margin-right: 8px;
  font-weight: 600;
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
  border-radius: 8px;
}

</style>
