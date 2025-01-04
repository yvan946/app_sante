import { Observable, ApplicationSettings } from '@nativescript/core';
import { Document } from '../models/document.model';

export class DocumentService extends Observable {
    private static instance: DocumentService;
    private static readonly DOCUMENTS_KEY = 'saved_documents';
    private documents: Document[] = [];

    private constructor() {
        super();
        this.loadDocuments();
    }

    static getInstance(): DocumentService {
        if (!DocumentService.instance) {
            DocumentService.instance = new DocumentService();
        }
        return DocumentService.instance;
    }

    getDocuments(type: string): Document[] {
        return this.documents.filter(doc => doc.type === type);
    }

    addDocument(document: Document): void {
        this.documents.push(document);
        this.saveDocuments();
        this.notifyPropertyChange('documents', this.documents);
    }

    deleteDocument(id: string): void {
        const index = this.documents.findIndex(doc => doc.id === id);
        if (index !== -1) {
            this.documents.splice(index, 1);
            this.saveDocuments();
            this.notifyPropertyChange('documents', this.documents);
        }
    }

    private loadDocuments(): void {
        const savedDocs = ApplicationSettings.getString(DocumentService.DOCUMENTS_KEY);
        if (savedDocs) {
            const parsedDocs = JSON.parse(savedDocs);
            this.documents = parsedDocs.map(doc => ({
                ...doc,
                date: new Date(doc.date)
            }));
        }
    }

    private saveDocuments(): void {
        ApplicationSettings.setString(DocumentService.DOCUMENTS_KEY, JSON.stringify(this.documents));
    }
}