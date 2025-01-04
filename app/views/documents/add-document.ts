import { NavigatedData, Page, Frame } from '@nativescript/core';
import { DocumentFormModel } from '../../components/document-form/document-form';
import * as imagepicker from "@nativescript/imagepicker";

export class AddDocumentPageModel extends DocumentFormModel {
    constructor(type: string) {
        super(type);
    }

    onCancel() {
        Frame.topmost().goBack();
    }

    async onPickFromGallery() {
        try {
            const context = imagepicker.create({
                mode: "single"
            });
            
            const selection = await context.present();
            if (selection.length > 0) {
                const selected = selection[0];
                this.handleImageSelected(selected);
            }
        } catch (error) {
            console.error('Erreur lors de la sélection de l\'image:', error);
        }
    }

    private async handleImageSelected(asset: any) {
        try {
            const filePath = await this.fileService.saveImageFromAsset(asset);
            if (filePath) {
                this._filePath = filePath;
                this._fileName = `Image ${new Date().toLocaleTimeString()}`;
                this.notifyPropertyChange('hasFile', true);
                this.notifyPropertyChange('fileName', this._fileName);
                this.notifyPropertyChange('filePath', this._filePath);
            }
        } catch (error) {
            console.error('Erreur lors du traitement de l\'image:', error);
        }
    }

    onRemoveFile() {
        this._filePath = null;
        this._fileName = '';
        this.notifyPropertyChange('hasFile', false);
        this.notifyPropertyChange('fileName', '');
        this.notifyPropertyChange('filePath', '');
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    const context = page.navigationContext;
    page.bindingContext = new AddDocumentPageModel(context.type);
}