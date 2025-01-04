import { Observable, Frame, EventData, View } from '@nativescript/core';

export class BottomNavModel extends Observable {
    private navigate(page: string) {
        Frame.topmost().navigate({
            moduleName: `views/${page}`,
            clearHistory: true,
            animated: false
        });
    }

    onCalendarTap() {
        this.navigate('calendar-page');
    }

    onContactTap() {
        this.navigate('contact-page');
    }

    onDocumentsTap() {
        this.navigate('documents-page');
    }

    onTreatmentsTap() {
        this.navigate('treatments-page');
    }

    onSponsorsTap() {
        this.navigate('sponsors-page');
    }
}

export function onLoaded(args: EventData) {
    const view = args.object as View;
    view.bindingContext = new BottomNavModel();
}