function formatTime(inputMs: number): string {
    const ms = Math.max(0, Math.floor(inputMs));
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    const dayPart = days > 0 ? `${days}д ` : '';
    return `${dayPart}${hh}ч ${mm}м ${ss}с`;
}

function getTimeParts(inputMs: number): { days: number; hours: number; minutes: number; seconds: number } {
    const ms = Math.max(0, Math.floor(inputMs));
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}

export { formatTime, formatDate, getTimeParts };