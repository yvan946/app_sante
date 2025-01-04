export type DocumentType = 'prescription' | 'treatment' | 'hospitalization' | 'analysis' | 'other';

export interface Document {
    id: string;
    type: DocumentType;
    title: string;
    date: Date;
    filePath: string;
    fileType: string; // 'pdf', 'image', etc.
    description?: string;
}