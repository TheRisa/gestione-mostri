import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /** Costruttore */
  constructor() {}

  /**
   * Passando una chiave si ottiene il valore nello storage
   *
   * @param key Chiave dello storage
   * @returns Valore della chiave
   */
  public get(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Passando una chiave e il suo valroe si si salva il dato nello storage
   *
   * @param key Chiave dello storage
   * @param value Valora da salvare
   */
  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Passando una chiave si elimina dallo storage
   *
   * @param key Chiave dello storage
   */
  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
