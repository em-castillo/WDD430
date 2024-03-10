import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit{
  messages: Message[] = [
    // new Message('1', 'message 1', 'First Message', 'Emma'),
    // new Message('2', 'message 2', 'Second Message', 'Linda'),
    // new Message('3', 'message 3', 'Third Message', 'Paul'),

  ];

  constructor(private messagesService: MessagesService){}

  ngOnInit(){
    // this.messages = this.messagesService.getMessages();
    this.messagesService.getMessages();
    this.messagesService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  onAddMessage(message:Message){
    this.messages.push(message);
  }

}
