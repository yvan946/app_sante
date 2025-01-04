import { NavigatedData, Page, Observable, confirm } from '@nativescript/core';
import { CalendarEvent } from '../models/calendar-event.model';
import { AddEventModalModel } from '../components/calendar/add-event-modal';
import { CalendarService } from '../services/calendar.service';
import { formatFullDateTime } from '../utils/date-formatter';

interface EventGroup {
    title: string;
    events: (CalendarEvent & { formattedDateTime: string })[];
}

export class CalendarPageModel extends Observable {
    private calendarService: CalendarService;
    private showAddModal: boolean = false;
    private modalModel: AddEventModalModel;

    constructor() {
        super();
        this.calendarService = CalendarService.getInstance();
        this.modalModel = new AddEventModalModel();
        
        this.modalModel.on('eventSaved', (args: any) => {
            this.calendarService.addEvent(args.data);
            this.showAddModal = false;
            this.notifyPropertyChange('isModalVisible', false);
            this.notifyPropertyChange('groupedEvents', this.groupedEvents);
        });

        this.modalModel.on('modalClosed', () => {
            this.showAddModal = false;
            this.notifyPropertyChange('isModalVisible', false);
        });
    }

    get isModalVisible(): boolean {
        return this.showAddModal;
    }

    get modalContext(): AddEventModalModel {
        return this.modalModel;
    }

    get groupedEvents(): EventGroup[] {
        const events = this.calendarService.getEvents();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const groups: EventGroup[] = [
            { title: "Aujourd'hui", events: [] },
            { title: "Demain", events: [] },
            { title: "Cette semaine", events: [] },
            { title: "Plus tard", events: [] }
        ];

        events.sort((a, b) => a.date.getTime() - b.date.getTime())
             .forEach(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);

                const eventWithDateTime = {
                    ...event,
                    formattedDateTime: formatFullDateTime(event.date, event.time)
                };

                if (eventDate.getTime() === today.getTime()) {
                    groups[0].events.push(eventWithDateTime);
                } else if (eventDate.getTime() === tomorrow.getTime()) {
                    groups[1].events.push(eventWithDateTime);
                } else if (eventDate < nextWeek) {
                    groups[2].events.push(eventWithDateTime);
                } else {
                    groups[3].events.push(eventWithDateTime);
                }
             });

        return groups.filter(group => group.events.length > 0);
    }

    onAddEventTap() {
        this.showAddModal = true;
        this.notifyPropertyChange('isModalVisible', true);
    }

    async onDeleteEvent(args: any) {
        const event = args.object.bindingContext;
        const result = await confirm({
            title: "Confirmation de suppression",
            message: `Voulez-vous vraiment supprimer l'événement "${event.title}" ?`,
            okButtonText: "Supprimer",
            cancelButtonText: "Annuler"
        });

        if (result) {
            this.calendarService.deleteEvent(event.id);
            this.notifyPropertyChange('groupedEvents', this.groupedEvents);
        }
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    page.bindingContext = new CalendarPageModel();
}