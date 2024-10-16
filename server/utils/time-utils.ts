export function formatTimer(timer: number) {
    const timeElapsed = 3600 - timer;

    const minutes = Math.floor(timeElapsed / 60);
    const remainingSeconds = timeElapsed % 60;

    return `${minutes} m ${remainingSeconds} s`;
}