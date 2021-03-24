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
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14 4.90292V2C14 1.17595 14.9408 0.705573 15.6 1.2L22.9333 6.7C23.4667 7.1 23.4667 7.9 22.9333 8.3L15.6 13.8C14.9408 14.2944 14 13.824 14 13V9.99179C13.9022 10.0352 13.8032 10.0752 13.7032 10.1115C13.1666 10.3066 12.6525 10.5662 12.1728 10.8868C10.9958 11.6732 10.0785 12.791 9.53681 14.0987C8.99511 15.4065 8.85338 16.8455 9.12953 18.2338C9.40569 19.6222 10.0873 20.8974 11.0882 21.8983C12.0892 22.8992 13.3644 23.5809 14.7527 23.857C16.141 24.1332 17.5801 23.9914 18.8878 23.4498C20.1956 22.9081 21.3133 21.9907 22.0998 20.8138C22.4203 20.334 22.68 19.8199 22.8751 19.2833C23.3461 17.9878 24.4234 16.8376 25.8019 16.8376C27.1804 16.8376 28.3237 17.9666 28.0424 19.3161C27.7261 20.8341 27.1205 22.2852 26.2505 23.5872C24.9155 25.5851 23.0181 27.1422 20.7982 28.0618C18.5782 28.9813 16.1355 29.2219 13.7788 28.7531C11.4222 28.2843 9.25742 27.1273 7.55836 25.4282C5.85929 23.7291 4.70221 21.5644 4.23344 19.2077C3.76467 16.8511 4.00526 14.4083 4.92479 12.1884C5.84432 9.96845 7.40148 8.07104 9.39937 6.73609C10.7014 5.8661 12.1525 5.26047 13.6705 4.94413C13.782 4.92088 13.892 4.90737 14 4.90292Z" fill="#2F2B29"/>
      </svg>
    {:else if playing}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="4" width="8" height="24" rx="2" fill="#2F2B29"/>
      <rect x="19" y="4" width="8" height="24" rx="2" fill="#2F2B29"/>
      </svg>
    {:else}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4.70727V27.3231C7 28.9082 8.75604 29.8634 10.0868 29.002L27.4255 17.7792C28.6382 16.9942 28.6443 15.222 27.437 14.4287L10.0983 3.03581C8.76833 2.16193 7 3.11592 7 4.70727Z" fill="#2F2B29"/>
      </svg>
    {/if}
  </button>
</div>

<style>

.circle {
  --size: 120px;
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
  --fill: var(--color-blue);
}

.warning.playing {
  --fill: var(--color-yellow);
}

.finished {
  --fill: var(--color-pink);
}

button {
  --size: 90px;
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
