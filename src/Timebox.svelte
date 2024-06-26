<script>
  import encodeTimerParams from "./helpers/encodeTimerParams";
  import defaultTimer from "./defaultTimer";
  import Controls from "./Controls.svelte";
  import Timer from "./Timer.svelte";
  import { flip } from "svelte/animate";

  export let timers;

  let uid = 1;

  timers.map((timer) => {
    timer.id = uid++;
    timer.elapsed = 0;
    timer.playing = false;
  });

  let autoplay = true;

  let lastUpdate = new Date().getTime();

  let timerInterval = setInterval(updateTimers, 100);

  function updateTimers() {
    const elapsed = new Date().getTime() - lastUpdate;
    timers.map((timer) => {
      if (timer.playing) {
        timer.elapsed = Math.min(timer.elapsed + elapsed, timer.duration);
      }
    });
    timers = timers;
    lastUpdate = new Date().getTime();
  }

  function handleFinish(i) {
    if (autoplay && timers[i + 1] && !timers[i + 1].playing) {
      timers[i + 1].finished = false;
      timers[i + 1].elapsed = 0;
      timers[i + 1].playing = true;
      timers = timers;
    }
  }

  function remove(timer) {
    timers = timers.filter((t) => t !== timer);
  }

  function addTimer() {
    timers = [...timers, { id: uid++, ...defaultTimer }];
  }

  function handleKeyPress(e) {
    if (e.code === "Space" && document.activeElement === document.body) {
      if (timers.find((timer) => timer.playing)) {
        timers.map((timer) => {
          timer.paused = timer.playing;
          timer.playing = false;
        });
      } else if (timers.find((timer) => timer.paused)) {
        timers.map((timer) => {
          timer.playing = timer.paused;
          timer.paused = false;
        });
      } else {
        if (timers[0].elapsed > 0) {
          timers.map((timer) => {
            timer.elapsed = 0;
          });
        } else if (timers[0].duration > 0) {
          timers[0].playing = true;
        }
      }
      timers = timers;
    } else if (e.code === "Escape") {
      document.activeElement.blur();
    }
  }
</script>

<svelte:window on:keypress={handleKeyPress} />

<div class="page-header">
  <!-- svelte-ignore a11y-no-redundant-roles -->
  <header role="banner">Timebox</header>
  <Controls bind:autoplay />
</div>

<div class="timers">
  {#each timers as timer, i (timer.id)}
    <div animate:flip={{ duration: 200 }}>
      <Timer
        bind:label={timer.label}
        bind:duration={timer.duration}
        bind:warning={timer.warning}
        bind:elapsed={timer.elapsed}
        bind:playing={timer.playing}
        on:finished={() => handleFinish(i)}
        on:remove={() => remove(timer)}
        counter={i + 1}
      />
    </div>
  {/each}
  <button class="new-timer" on:click={addTimer}>
    <span class="icon">+</span>
    <span>New Timer</span>
  </button>
</div>

<style>
  .timers {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: var(--space);
  }

  .new-timer {
    background: transparent;
    border: dashed 4px var(--color-gray-300);
    border-radius: 16px;
    color: var(--color-gray-500);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(0);
    transition:
      background-color 200ms,
      border-color 200ms,
      color 200ms;
  }
  .new-timer > * + * {
    margin-inline-start: 8px;
  }

  .new-timer:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--color-gray-500);
    color: var(--color-gray-700);
  }
  .new-timer:active {
    transform: translateY(1px);
  }

  .icon {
    color: var(--color-gray-300);
    font-size: 2.5em;
    font-weight: 600;
    transform: translateY(-0.09em);
    transition: color 200ms;
  }

  .new-timer:hover .icon {
    color: var(--color-gray-500);
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
  }

  [role="banner"] {
    color: var(--color-gray-300);
    cursor: default;
    font-weight: 650;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
