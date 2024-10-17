export const maxTimer = 10800;

export const timer = ref<number>(maxTimer);

export const formattedTime = computed(() => {
    const hours = Math.floor(timer.value / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timer.value % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer.value % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  });