import { ApplicationSettings } from '@nativescript/core';

export class PinService {
  private static readonly PIN_KEY = 'user_pin';

  static savePin(pin: string): void {
    try {
      ApplicationSettings.setString(this.PIN_KEY, pin);
    } catch (error) {
      console.error('Error saving PIN:', error);
    }
  }

  static getPin(): string | null {
    try {
      return ApplicationSettings.getString(this.PIN_KEY);
    } catch (error) {
      console.error('Error getting PIN:', error);
      return null;
    }
  }

  static hasPin(): boolean {
    try {
      return ApplicationSettings.hasKey(this.PIN_KEY);
    } catch (error) {
      console.error('Error checking PIN:', error);
      return false;
    }
  }

  static validatePin(pin: string): boolean {
    try {
      const savedPin = this.getPin();
      return savedPin === pin;
    } catch (error) {
      console.error('Error validating PIN:', error);
      return false;
    }
  }
}