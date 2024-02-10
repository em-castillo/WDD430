import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageChangedEvent = new EventEmitter<Message[]>();

  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message{
   return this.messages.find((c) => c.id === id);
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
