import { Observable, ApplicationSettings } from '@nativescript/core';
import { Contact } from '../models/contact.model';
import { ClipboardService } from './clipboard.service';

export class ContactService extends Observable {
    private static instance: ContactService;
    private contacts: Contact[] = [];
    private static readonly CONTACTS_KEY = 'saved_contacts';
    private clipboardService: ClipboardService;

    private constructor() {
        super();
        this.loadContacts();
        this.clipboardService = ClipboardService.getInstance();
    }

    static getInstance(): ContactService {
        if (!ContactService.instance) {
            ContactService.instance = new ContactService();
        }
        return ContactService.instance;
    }

    getContacts(): Contact[] {
        return this.contacts;
    }

    addContact(contact: Contact): void {
        this.contacts.push(contact);
        this.saveContacts();
        this.notifyPropertyChange('contacts', this.contacts);
    }

    private loadContacts(): void {
        const savedContacts = ApplicationSettings.getString(ContactService.CONTACTS_KEY);
        if (savedContacts) {
            this.contacts = JSON.parse(savedContacts);
        }
    }

    private saveContacts(): void {
        ApplicationSettings.setString(ContactService.CONTACTS_KEY, JSON.stringify(this.contacts));
    }

    async copyToClipboard(text: string): Promise<boolean> {
        if (!text) return false;
        return await this.clipboardService.copyText(text);
    }
}