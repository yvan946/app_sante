import { Observable } from '@nativescript/core';

export class PinPadModel extends Observable {
  private _pin = '';

  constructor() {
    super();
  }

  get pin(): string {
    return this._pin;
  }

  onNumberTap(args: any) {
    if (this._pin.length < 4) {
      const button = args.object;
      this._pin += button.text;
      this.notifyPropertyChange('pin', this._pin);
      
      if (this._pin.length === 4) {
        this.onPinEntered(this._pin);
      }
    }
  }

  onClear() {
    this._pin = '';
    this.notifyPropertyChange('pin', this._pin);
  }

  onDelete() {
    if (this._pin.length > 0) {
      this._pin = this._pin.slice(0, -1);
      this.notifyPropertyChange('pin', this._pin);
    }
  }

  protected onPinEntered(pin: string) {
    // À surcharger dans les classes enfants
  }
}