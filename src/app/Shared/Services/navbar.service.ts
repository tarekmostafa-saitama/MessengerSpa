import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  RoleChanged: EventEmitter<void>  = new EventEmitter<void>();
  constructor() { }
}
