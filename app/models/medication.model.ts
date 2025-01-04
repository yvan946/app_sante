export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    stock: number;
    unit: string;
    alertThreshold: number;
    expiryDate?: Date;
}