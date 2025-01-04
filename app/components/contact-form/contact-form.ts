import { Observable } from '@nativescript/core';
import { ContactService } from '../../services/contact.service';

export class ContactFormModel extends Observable {
    private name: string = '';
    private phone: string = '';
    private email: string = '';
    private address: string = '';
    private contactService: ContactService;

    constructor(contactService: ContactService) {
        super();
        this.contactService = contactService;
    }

    onSaveContact() {
        if (this.name && this.phone) {
            this.contactService.addContact({
                id: Date.now().toString(),
                name: this.name,
                phone: this.phone,
                email: this.email,
                address: this.address
            });
            this.clearForm();
        }
    }

    private clearForm() {
        this.name = '';
        this.phone = '';
        this.email = '';
        this.address = '';
        this.notifyPropertyChange('name', '');
        this.notifyPropertyChange('phone', '');
        this.notifyPropertyChange('email', '');
        this.notifyPropertyChange('address', '');
    }
}