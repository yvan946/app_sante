import { Observable } from '@nativescript/core';
import { Medication } from '../../models/medication.model';

export class MedicationStockModel extends Observable {
    private medications: Medication[] = [
        {
            id: '1',
            name: 'Paracétamol',
            dosage: '1000mg',
            frequency: '3x par jour',
            stock: 15,
            unit: 'comprimés',
            alertThreshold: 5
        },
        {
            id: '2',
            name: 'Ibuprofène',
            dosage: '400mg',
            frequency: '2x par jour',
            stock: 8,
            unit: 'comprimés',
            alertThreshold: 5
        }
    ];

    get medicationList(): Medication[] {
        return this.medications;
    }

    getStockStatus(stock: number, threshold: number): string {
        if (stock <= threshold) {
            return 'text-red-500';
        } else if (stock <= threshold * 2) {
            return 'text-orange-500';
        }
        return 'text-green-500';
    }

    adjustStock(id: string, amount: number) {
        const medication = this.medications.find(m => m.id === id);
        if (medication) {
            medication.stock = Math.max(0, medication.stock + amount);
            this.notifyPropertyChange('medicationList', this.medicationList);
        }
    }
}