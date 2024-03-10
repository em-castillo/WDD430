import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageChangedEvent = new EventEmitter<Message[]>();

  maxMessageId: number;
  messagesListClone: Message[];

  private messages: Message[] = [];

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
   }

   getMaxId(): number {

    let maxId = 0;
    let currentId = 0;

    this.messages.forEach(message => {
      //convert document.id into a number
        currentId = +message.id
        if (currentId > maxId) {
            maxId = currentId;
  }
  })

    return maxId;
  }

  getMessages(){
    // return this.messages.slice();
    return this.http.get<Message[]>('https://cms-project-bf086-default-rtdb.firebaseio.com/messages.json')
    .subscribe({
      // success method
      next: (messages: Message[] ) => {
         this.messages = messages;
         this.maxMessageId = this.getMaxId();
         this.messagesListClone = this.messages.slice();
         this.messageChangedEvent.next(this.messagesListClone);
      },
      // error method
      error: (error: any) => {
        console.error(error);
      }, 
   })
  }

  getMessage(id: string): Message{
   return this.messages.find((c) => c.id === id);
  }

  storeMessages() {
    const MsgString = JSON.stringify(this.messages);
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http.put('https://cms-project-bf086-default-rtdb.firebaseio.com/messages.json',
    MsgString, httpHeaders)
    .subscribe(response => {
      this.messageChangedEvent.next(this.messages.slice());
    })
  }


  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }
}
