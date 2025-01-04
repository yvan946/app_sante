import { Observable, EventData } from '@nativescript/core';
import { Contact } from '../../models/contact.model';

export class ContactMenuModel extends Observable {
    private _contact: Contact;
    private _isExpanded: boolean = false;
    private _onCopy: (text: string, label: string) => void;

    constructor(contact: Contact, onCopy: (text: string, label: string) => void) {
        super();
        this._contact = contact;
        this._onCopy = onCopy;
    }

    get contact(): Contact {
        return this._contact;
    }

    get isExpanded(): boolean {
        return this._isExpanded;
    }

    onToggleMenu() {
        this._isExpanded = !this._isExpanded;
        this.notifyPropertyChange('isExpanded', this._isExpanded);
    }

    onCopyPhone() {
        this._onCopy(this.contact.phone, 'Numéro copié !');
    }

    onCopyEmail() {
        this._onCopy(this.contact.email, 'Email copié !');
    }

    onCopyAddress() {
        this._onCopy(this.contact.address, 'Adresse copiée !');
    }
}

export function createContactMenu(contact: Contact, onCopy: (text: string, label: string) => void): ContactMenuModel {
    return new ContactMenuModel(contact, onCopy);
}