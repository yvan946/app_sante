import { Observable } from '@nativescript/core';
import { DocumentType } from '../../models/document.model';
import { FileService } from '../../services/file.service';

export class DocumentFormModel extends Observable {
    protected fileService: FileService;
    protected _type: DocumentType;
    protected _title: string = '';
    protected _description: string = '';
    protected _filePath: string | null = null;
    protected _fileName: string = '';
    protected _fileType: 'image' | 'pdf' = 'image';

    constructor(type: DocumentType) {
        super();
        this.fileService = FileService.getInstance();
        this._type = type;
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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        if (this._description !== value) {
            this._description = value;
            this.notifyPropertyChange('description', value);
        }
    }

    get hasFile(): boolean {
        return !!this._filePath;
    }

    get fileName(): string {
        return this._fileName;
    }

    get filePath(): string | null {
        return this._filePath;
    }

    get fileType(): string {
        return this._fileType;
    }

    async onTakePicture() {
        const filePath = await this.fileService.takePicture();
        if (filePath) {
            this._filePath = filePath;
            this._fileName = `Photo ${new Date().toLocaleTimeString()}`;
            this._fileType = 'image';
            this.notifyPropertyChange('hasFile', true);
            this.notifyPropertyChange('fileName', this._fileName);
            this.notifyPropertyChange('filePath', this._filePath);
            this.notifyPropertyChange('fileType', this._fileType);
        }
    }
}