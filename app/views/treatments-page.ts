import { NavigatedData, Page } from '@nativescript/core';
import { MedicationStockModel } from '../components/medication-stock/medication-stock';

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    page.bindingContext = new MedicationStockModel();
}