export function getDate(e: Date, spare: string): string {
    const dd = setZero(e.getDate());
    const mm = setZero(e.getMonth() + 1);
    const yyyy = setZero(e.getFullYear());
    return `${dd}${spare}${mm}${spare}${yyyy}`;
}

export function getTime(e: Date): string {
    const HH = setZero(e.getHours());
    const mm = setZero(e.getMinutes());
    const ss = setZero(e.getSeconds());
    return `${HH}:${mm}:${ss}`;
}

export function setZero(num: number) {
    return num < 10 ? '0' + num : num;
}

export function setTimezoneOffset(date: Date): string {
    if (!date)
        return null;

    date = new Date(date);
    date.setHours(0, -date.getTimezoneOffset(), 0, 0);
    return date.toISOString();
}

export function splitTime(date: string): string {
    if (!date)
        return null;
    
    return date.split('T')[0];
}