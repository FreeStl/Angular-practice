import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages/messages.service';

@Component({
  selector: 'app-messages',
  template: `
    <div class="message-position" *ngIf="messagesService.message.length">
        {{messagesService.message}}
      <button class="btn btn-info" (click)="messagesService.clear()">Ok</button>
    </div>`,
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(public messagesService: MessagesService) { }

  ngOnInit() {
  }

}
