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

  private sortMessages() {
    this.messages.sort((a, b) => a.msgText.localeCompare(b.msgText));
  }

  getMessages(){
    // return this.messages.slice();
    return this.http.get<Message[]>('http://localhost:3000/messages')
    .subscribe({
      // success method
      next: (messages: Message[] ) => {
         this.messages = messages;
         this.maxMessageId = this.getMaxId();
         this.sortMessages();
         this.messagesListClone = this.messages.slice();
         this.messageChangedEvent.next(this.messagesListClone);
         console.log(messages);
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
    this.http.put('http://localhost:3000/messages',
    MsgString, httpHeaders)
    .subscribe(response => {
      this.messageChangedEvent.next(this.messages.slice());
    })
  }


  addMessage(message: Message){
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ msg: string, msgProperty: Message }>('http://localhost:3000/messages',
    message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.msgProperty);
          this.sortMessages();
        }
      );



    // this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    // this.storeMessages();
  }
}
