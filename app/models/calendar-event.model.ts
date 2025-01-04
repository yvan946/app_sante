export type EventType = 'appointment' | 'symptom' | 'reminder';

export interface CalendarEvent {
    id: string;
    type: EventType;
    title: string;
    date: Date;
    time?: string;
    description?: string;
    location?: string;
    doctor?: string;
    severity?: number; // Pour les symptômes
    duration?: string; // Pour les symptômes
}