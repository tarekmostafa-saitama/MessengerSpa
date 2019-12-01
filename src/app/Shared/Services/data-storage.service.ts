import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  
  constructor() { }

  getToken(): string {
    return this.getprovider('token');
  }
  getLanguage(): string {
    return this.getprovider('lang');
  }
  getRole(): string {
    return this.getprovider('role');
  }


  private getprovider(item: string): string {
    return localStorage.getItem(item);
  }

  setToken(value: string) {
    this.setprovider('token', value);
  }

  setLanguage(value: string) {
    this.setprovider('lang', value);
  }
  setRole(value: string) {
    this.setprovider('role', value);
  }


  private setprovider(item: string, value: string) {
    localStorage.setItem(item, value);
  }



  removeToken() {
    this.removeprovider('token');
  }

  removeLanguage() {
    this.removeprovider('lang');
  }
  removeRole() {
    this.removeprovider('role');
  }


  private removeprovider(item: string) {
    localStorage.removeItem(item);
  }
}
