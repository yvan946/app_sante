import { Observable, SegmentedBarItem } from '@nativescript/core';
import { CalendarEvent, EventType } from '../../models/calendar-event.model';

export class AddEventModalModel extends Observable {
    private _eventType: EventType = 'appointment';
    private _title: string = '';
    private _date: Date = new Date();
    private _time: string = '';
    private _description: string = '';
    private _location: string = '';
    private _doctor: string = '';
    private _severity: number = 1;
    private _duration: string = '';
    private _eventTypes: SegmentedBarItem[];
    private _eventTypeIndex: number = 0;

    constructor() {
        super();
        this._eventTypes = [
            this.createSegmentedBarItem('Rendez-vous'),
            this.createSegmentedBarItem('Symptôme'),
            this.createSegmentedBarItem('Rappel')
        ];
    }

    private createSegmentedBarItem(title: string): SegmentedBarItem {
        const item = new SegmentedBarItem();
        item.title = title;
        return item;
    }

    get eventTypes(): SegmentedBarItem[] {
        return this._eventTypes;
    }

    get eventTypeIndex(): number {
        return this._eventTypeIndex;
    }

    set eventTypeIndex(value: number) {
        if (this._eventTypeIndex !== value) {
            this._eventTypeIndex = value;
            this._eventType = ['appointment', 'symptom', 'reminder'][value] as EventType;
            this.notifyPropertyChange('eventTypeIndex', value);
            this.notifyPropertyChange('isAppointment', this.isAppointment);
            this.notifyPropertyChange('isSymptom', this.isSymptom);
            this.notifyPropertyChange('isReminder', this.isReminder);
        }
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
            this.notifyPropertyChange('title', value);
        }
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        if (this._date !== value) {
            this._date = value;
            this.notifyPropertyChange('date', value);
        }
    }

    get time(): string {
        return this._time;
    }

    set time(value: string) {
        if (this._time !== value) {
            this._time = value;
            this.notifyPropertyChange('time', value);
        }
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        if (this._description !== value) {
            this._description = value;
            this.notifyPropertyChange('description', value);
        }
    }

    get location(): string {
        return this._location;
    }

    set location(value: string) {
        if (this._location !== value) {
            this._location = value;
            this.notifyPropertyChange('location', value);
        }
    }

    get doctor(): string {
        return this._doctor;
    }

    set doctor(value: string) {
        if (this._doctor !== value) {
            this._doctor = value;
            this.notifyPropertyChange('doctor', value);
        }
    }

    get severity(): number {
        return this._severity;
    }

    set severity(value: number) {
        if (this._severity !== value) {
            this._severity = value;
            this.notifyPropertyChange('severity', value);
        }
    }

    get duration(): string {
        return this._duration;
    }

    set duration(value: string) {
        if (this._duration !== value) {
            this._duration = value;
            this.notifyPropertyChange('duration', value);
        }
    }

    get isAppointment(): boolean {
        return this._eventType === 'appointment';
    }

    get isSymptom(): boolean {
        return this._eventType === 'symptom';
    }

    get isReminder(): boolean {
        return this._eventType === 'reminder';
    }

    onSave() {
        if (!this._title || !this._date) return;

        const event: CalendarEvent = {
            id: Date.now().toString(),
            type: this._eventType,
            title: this._title,
            date: this._date,
            time: this._time,
            description: this._description,
            location: this.isAppointment ? this._location : undefined,
            doctor: this.isAppointment ? this._doctor : undefined,
            severity: this.isSymptom ? this._severity : undefined,
            duration: this.isSymptom ? this._duration : undefined
        };

        this.notify({ eventName: 'eventSaved', object: this, data: event });
    }

    onCancel() {
        this.notify({ eventName: 'modalClosed', object: this });
    }
}