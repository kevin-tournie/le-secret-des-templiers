export function formatTimer(timer: number) {
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;

    return `${minutes} m ${remainingSeconds} s`;
}