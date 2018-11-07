import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string ='';

  constructor() { }

  add(message: string): void {
    this.message = message;
  }

  clear(): void {
    this.message = '';
  }

}
