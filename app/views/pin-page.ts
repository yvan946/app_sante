import { NavigatedData, Page, Frame, Observable } from '@nativescript/core';
import { PinService } from '../services/pin-service';

export function onNavigatingTo(args: NavigatedData) {
  const page = args.object as Page;
  page.bindingContext = new PinPageModel();
}

class PinPageModel extends Observable {
  private _pin = '';
  private _headerText = '';
  private _messageText = '';
  private _errorText = '';
  private _firstPin = '';
  private _isConfirming = false;

  constructor() {
    super();
    this.updateTexts();
  }

  get pin(): string {
    return this._pin;
  }

  get headerText(): string {
    return this._headerText;
  }

  get messageText(): string {
    return this._messageText;
  }

  get errorText(): string {
    return this._errorText;
  }

  getDotClass(index: number): string {
    return `pin-dot ${index < this._pin.length ? 'filled' : ''}`;
  }

  private updateTexts() {
    if (!PinService.hasPin()) {
      if (!this._isConfirming) {
        this._headerText = 'Créer votre PIN';
        this._messageText = 'Entrez un code à 4 chiffres';
      } else {
        this._headerText = 'Confirmer le PIN';
        this._messageText = 'Entrez à nouveau votre code';
      }
    } else {
      this._headerText = 'Bienvenue';
      this._messageText = 'Entrez votre code PIN';
    }
    this.notifyPropertyChange('headerText', this._headerText);
    this.notifyPropertyChange('messageText', this._messageText);
  }

  onNumberTap(args: any) {
    if (this._pin.length < 4) {
      const button = args.object;
      this._pin += button.text;
      
      // Notifier le changement pour mettre à jour les points
      for (let i = 0; i < 4; i++) {
        this.notifyPropertyChange(`getDotClass(${i})`, this.getDotClass(i));
      }
      
      if (this._pin.length === 4) {
        // Attendre un peu pour que l'utilisateur voie le dernier point
        setTimeout(() => {
          if (!PinService.hasPin()) {
            this.handlePinRegistration(this._pin);
          } else {
            this.handlePinValidation(this._pin);
          }
        }, 200);
      }
    }
  }

  onClear() {
    this._pin = '';
    this._errorText = '';
    // Mettre à jour tous les points
    for (let i = 0; i < 4; i++) {
      this.notifyPropertyChange(`getDotClass(${i})`, this.getDotClass(i));
    }
    this.notifyPropertyChange('errorText', this._errorText);
  }

  onDelete() {
    if (this._pin.length > 0) {
      this._pin = this._pin.slice(0, -1);
      this._errorText = ''; // Effacer le message d'erreur lors de la suppression
      // Mettre à jour tous les points
      for (let i = 0; i < 4; i++) {
        this.notifyPropertyChange(`getDotClass(${i})`, this.getDotClass(i));
      }
      this.notifyPropertyChange('errorText', this._errorText);
    }
  }

  private handlePinRegistration(pin: string) {
    if (!this._isConfirming) {
      this._firstPin = pin;
      this._isConfirming = true;
      this.updateTexts();
      this.onClear();
    } else {
      if (pin === this._firstPin) {
        PinService.savePin(pin);
        this.navigateToBoard();
      } else {
        this._errorText = 'Les codes ne correspondent pas. Réessayez.';
        this.notifyPropertyChange('errorText', this._errorText);
        this._isConfirming = false;
        this._firstPin = '';
        this.updateTexts();
        setTimeout(() => this.onClear(), 1000); // Attendre que l'utilisateur voie le message
      }
    }
  }

  private handlePinValidation(pin: string) {
    if (PinService.validatePin(pin)) {
      this.navigateToBoard();
    } else {
      this._errorText = 'Code PIN incorrect. Réessayez.';
      this.notifyPropertyChange('errorText', this._errorText);
      setTimeout(() => this.onClear(), 1000); // Attendre que l'utilisateur voie le message
    }
  }

  private navigateToBoard() {
    Frame.topmost().navigate({
      moduleName: 'views/board-page',
      clearHistory: true
    });
  }
}