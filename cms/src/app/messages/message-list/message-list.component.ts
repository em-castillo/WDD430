import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'message 1', 'First Message', 'Emma'),
    new Message('2', 'message 2', 'Second Message', 'Linda'),
    new Message('3', 'message 3', 'Third Message', 'Paul'),

  ];

  onAddMessage(message:Message){
    this.messages.push(message);
  }

}
