import { Clipboard, Utils } from '@nativescript/core';

export class ClipboardService {
    private static instance: ClipboardService;

    private constructor() {}

    static getInstance(): ClipboardService {
        if (!ClipboardService.instance) {
            ClipboardService.instance = new ClipboardService();
        }
        return ClipboardService.instance;
    }

    async copyText(text: string): Promise<boolean> {
        try {
            await Clipboard.setText(text);
            
            // Vérification de la copie
            const clipboardText = await Clipboard.getText();
            return clipboardText === text;
        } catch (error) {
            console.error('Erreur lors de la copie:', error);
            return false;
        }
    }
}