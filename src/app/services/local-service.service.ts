import { Injectable } from '@angular/core';
import { UserStored } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem(key: string): string | null {
    if(typeof window !== 'undefined') {
      return window.localStorage.getItem(`${key}`);
    } else {
      return null
    }
  }

  setItem(key: string, value: string): void {
    if(typeof window !== 'undefined') {
      window.localStorage.setItem(`${key}`, value);
    }
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(`${key}`);
  }
}
