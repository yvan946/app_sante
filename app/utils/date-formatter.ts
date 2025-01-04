export function formatEventDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    // Première lettre en majuscule
    const dateStr = date.toLocaleDateString('fr-FR', options);
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

export function formatEventTime(time: any): string {
    if (!time) return '';
    
    // Si c'est une Date (cas du TimePicker)
    if (time instanceof Date) {
        return `${time.getHours().toString().padStart(2, '0')}h${time.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Si c'est une chaîne au format HH:mm
    if (typeof time === 'string' && time.includes(':')) {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}h${minutes.padStart(2, '0')}`;
    }
    
    return '';
}

export function formatFullDateTime(date: Date, time?: any): string {
    const dateStr = formatEventDate(date);
    const timeStr = formatEventTime(time);
    return timeStr ? `${dateStr} à ${timeStr}` : dateStr;
}

export function formatGroupTitle(title: string): string {
    switch (title) {
        case "Today":
            return "Aujourd'hui";
        case "Tomorrow":
            return "Demain";
        case "This week":
            return "Cette semaine";
        case "Later":
            return "Plus tard";
        default:
            return title;
    }
}