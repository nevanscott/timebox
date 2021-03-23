<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let finished;
  export let playing;
  export let warning;
  export let completed;

  $: turn = `${completed}turn`
</script>

<div
  class="circle"
  class:playing={playing}
  class:warning={warning}
  class:finished={finished}
  style={`background: conic-gradient(
    var(--fill) ${turn},
    var(--track) ${turn}
    );`}
>
  <button
    on:click={() => dispatch('click')}
  >
    {#if finished}
      <svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 7.26259V2.90051C17 1.27107 18.8441 0.325479 20.1673 1.27648L30.7405 8.87597C31.8508 9.674 31.8508 11.326 30.7405 12.124L20.1673 19.7235C18.8441 20.6745 17 19.7289 17 18.0995V14.3498C16.8449 14.4085 16.6871 14.4603 16.5273 14.5047C15.2072 14.8716 13.9464 15.4473 12.7949 16.2168C10.6622 17.6418 8.99993 19.6672 8.01835 22.037C7.03677 24.4067 6.77994 27.0144 7.28035 29.5301C7.78075 32.0458 9.01592 34.3566 10.8296 36.1703C12.6434 37.9841 14.9542 39.2192 17.4699 39.7196C19.9856 40.22 22.5932 39.9632 24.963 38.9816C27.3327 38 29.3582 36.3378 30.7832 34.2051C31.5526 33.0535 32.1284 31.7928 32.4953 30.4727C33.0152 28.602 34.5428 27 36.4844 27C38.426 27 40.0314 28.5859 39.6918 30.4975C39.2105 33.2075 38.1725 35.8019 36.6294 38.1114C34.4318 41.4004 31.3082 43.9638 27.6537 45.4776C23.9992 46.9913 19.9778 47.3874 16.0982 46.6157C12.2186 45.844 8.65492 43.9391 5.85787 41.1421C3.06082 38.345 1.15601 34.7814 0.384303 30.9018C-0.387401 27.0221 0.00866571 23.0008 1.52242 19.3463C3.03617 15.6918 5.59962 12.5682 8.8886 10.3706C11.1981 8.82743 13.7925 7.7895 16.5024 7.30815C16.6711 7.27819 16.8373 7.26337 17 7.26259Z" fill="#2F2B29"/>
    </svg>
    {:else if playing}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="32" rx="4" fill="#2F2B29"/>
    <rect x="20" width="12" height="32" rx="4" fill="#2F2B29"/>
    </svg>
    {:else}
      <svg width="33" height="41" viewBox="0 0 33 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 4.41831V36.6424C0 39.8135 3.5136 41.7236 6.17493 39.9994L30.8572 24.0085C33.2807 22.4385 33.2929 18.8963 30.8803 17.3095L6.19798 1.07632C3.53819 -0.672983 0 1.23483 0 4.41831Z" fill="#2F2B29"/>
    </svg>
    {/if}
  </button>
</div>

<style>

.circle {
  --size: 160px;
  --track: var(--color-gray-100);
  --fill: var(--color-gray-300);
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-100);
  border-radius: var(--size);
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.05);
  transition: background 50ms;
}

.playing {
  --fill: var(--color-green);
}

.warning.playing {
  --fill: var(--color-yellow);
}

.finished {
  --fill: var(--color-pink);
}

button {
  --size: 120px;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: var(--size);
  border: none;
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 4px 8px rgba(0, 0, 0, 0.05);
}

</style>
