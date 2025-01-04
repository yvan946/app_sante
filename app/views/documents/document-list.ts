import { NavigatedData, Page, Observable, Frame } from '@nativescript/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';

export class DocumentListModel extends Observable {
    private documentService: DocumentService;
    private _type: string;
    private _title: string;

    constructor(type: string, title: string) {
        super();
        this.documentService = DocumentService.getInstance();
        this._type = type;
        this._title = title;
    }

    get documents(): Document[] {
        return this.documentService.getDocuments(this._type);
    }

    get title(): string {
        return this._title;
    }

    onBackTap(): void {
        Frame.topmost().goBack();
    }

    onAddDocument(): void {
        Frame.topmost().navigate({
            moduleName: 'views/documents/add-document',
            context: {
                type: this._type,
                title: this._title
            }
        });
    }

    onDeleteDocument(args: any): void {
        const document = args.object.bindingContext;
        this.documentService.deleteDocument(document.id);
        this.notifyPropertyChange('documents', this.documents);
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    const context = page.navigationContext;
    page.bindingContext = new DocumentListModel(context.type, context.title);
}