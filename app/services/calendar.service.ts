import { Observable, ApplicationSettings } from '@nativescript/core';
import { CalendarEvent } from '../models/calendar-event.model';

export class CalendarService extends Observable {
    private static instance: CalendarService;
    private static readonly EVENTS_KEY = 'calendar_events';
    private events: CalendarEvent[] = [];

    private constructor() {
        super();
        this.loadEvents();
    }

    static getInstance(): CalendarService {
        if (!CalendarService.instance) {
            CalendarService.instance = new CalendarService();
        }
        return CalendarService.instance;
    }

    getEvents(): CalendarEvent[] {
        return this.events;
    }

    addEvent(event: CalendarEvent): void {
        this.events.push(event);
        this.saveEvents();
        this.notifyPropertyChange('events', this.events);
    }

    deleteEvent(eventId: string): void {
        const index = this.events.findIndex(e => e.id === eventId);
        if (index !== -1) {
            this.events.splice(index, 1);
            this.saveEvents();
            this.notifyPropertyChange('events', this.events);
        }
    }

    private loadEvents(): void {
        const savedEvents = ApplicationSettings.getString(CalendarService.EVENTS_KEY);
        if (savedEvents) {
            const parsedEvents = JSON.parse(savedEvents);
            this.events = parsedEvents.map(event => ({
                ...event,
                date: new Date(event.date)
            }));
        }
    }

    private saveEvents(): void {
        ApplicationSettings.setString(CalendarService.EVENTS_KEY, JSON.stringify(this.events));
    }
}