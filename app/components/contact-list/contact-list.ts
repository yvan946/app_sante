import { Observable } from '@nativescript/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

export class ContactListModel extends Observable {
    private contactService: ContactService;

    constructor(contactService: ContactService) {
        super();
        this.contactService = contactService;
    }

    get contacts(): Contact[] {
        return this.contactService.getContacts();
    }

    onCopyInfo(args: any) {
        const contact: Contact = args.object.bindingContext;
        const info = `${contact.name}\n${contact.phone}\n${contact.email}\n${contact.address}`;
        this.contactService.copyToClipboard(info);
    }
}