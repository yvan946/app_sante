import { NavigatedData, Page, Observable, Frame } from '@nativescript/core';
import { ContactService } from '../services/contact.service';
import { createContactMenu } from '../components/contact-menu/contact-menu';
import { Contact } from '../models/contact.model';

export class ContactPageModel extends Observable {
    private contactService: ContactService;
    private showForm: boolean = false;
    private name: string = '';
    private phone: string = '';
    private email: string = '';
    private address: string = '';

    constructor() {
        super();
        this.contactService = ContactService.getInstance();
    }

    get contacts() {
        return this.contactService.getContacts().map(contact => 
            createContactMenu(contact, this.handleCopy.bind(this))
        );
    }

    get isFormVisible() {
        return this.showForm;
    }

    onAddContactTap() {
        this.showForm = true;
        this.notifyPropertyChange('isFormVisible', true);
    }

    onCancelTap() {
        this.showForm = false;
        this.clearForm();
        this.notifyPropertyChange('isFormVisible', false);
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
            this.showForm = false;
            this.notifyPropertyChange('isFormVisible', false);
            this.notifyPropertyChange('contacts', this.contacts);
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

    private async handleCopy(text: string, message: string) {
        if (!text) return;

        const success = await this.contactService.copyToClipboard(text);
        if (success) {
            this.showCopiedFeedback(message);
        } else {
            this.showCopiedFeedback('Erreur lors de la copie');
        }
    }

    private showCopiedFeedback(message: string) {
        const page = Frame.topmost().currentPage;
        if (!page) return;

        const feedback = new Label();
        feedback.text = message;
        feedback.className = "text-sm text-white bg-gray-800 px-4 py-2 rounded-full";
        feedback.horizontalAlignment = "center";
        feedback.verticalAlignment = "bottom";
        feedback.marginBottom = 60;
        feedback.opacity = 0;

        page.addChild(feedback);

        feedback.animate({
            translate: { x: 0, y: -20 },
            opacity: 1,
            duration: 300
        }).then(() => {
            setTimeout(() => {
                feedback.animate({
                    translate: { x: 0, y: 0 },
                    opacity: 0,
                    duration: 300
                }).then(() => {
                    if (page.getChildIndex(feedback) !== -1) {
                        page.removeChild(feedback);
                    }
                });
            }, 1500);
        });
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    page.bindingContext = new ContactPageModel();
}