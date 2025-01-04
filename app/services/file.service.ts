import { ImageSource, knownFolders, path } from '@nativescript/core';
import { takePicture, requestPermissions } from '@nativescript/camera';

export class FileService {
    private static instance: FileService;

    private constructor() {}

    static getInstance(): FileService {
        if (!FileService.instance) {
            FileService.instance = new FileService();
        }
        return FileService.instance;
    }

    async takePicture(): Promise<string | null> {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) {
                console.error('No camera permission');
                return null;
            }

            const imageAsset = await takePicture({
                width: 1280,
                height: 960,
                keepAspectRatio: true,
                saveToGallery: false
            });

            if (imageAsset) {
                return await this.saveImageFromAsset(imageAsset);
            }
        } catch (error) {
            console.error('Error taking picture:', error);
        }
        return null;
    }

    async saveImageFromAsset(imageAsset: any): Promise<string | null> {
        try {
            const imageSource = await ImageSource.fromAsset(imageAsset);
            const documentsFolder = knownFolders.documents();
            const fileName = `IMG_${Date.now()}.jpg`;
            const filePath = path.join(documentsFolder.path, fileName);
            
            const saved = await imageSource.saveToFile(filePath, "jpg");
            return saved ? filePath : null;
        } catch (error) {
            console.error('Error saving image:', error);
            return null;
        }
    }
}