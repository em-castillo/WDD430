import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactsService } from '../contacts/contacts.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageChangedEvent = new EventEmitter<Message[]>();

  maxMessageId: number = 0;
  messagesListClone: Message[];

  messages: Message[] = [];

  constructor(private http: HttpClient, private contactService: ContactsService) {
    this.maxMessageId = this.getMaxId();
    // this.messages = MOCKMESSAGES;
   }

   ngOnInit() {
    this.getMessages();
  }

   getMaxId(): number {

    let maxId = 0;
    // let currentId = 0;

    for (let message of this.messages) {
      // let currentId = + maxId;
      //convert document.id into a number
        let currentId = +message.id
        if (currentId > maxId) {
            maxId = currentId;
  }
  }

    return maxId;
  }

  private sortMessages() {
    this.messages.sort((a, b) => a.msgText.localeCompare(b.msgText));
  }

  // getMessages(){
  //   // return this.messages.slice();
  //   this.http.get<Message[]>('http://localhost:3000/messages')
  //   .subscribe({
  //     // success method
  //     next: (messages: Message[] ) => {
  //        this.messages = messages;
  //        this.maxMessageId = this.getMaxId();
  //        this.sortMessages();
  //        this.messagesListClone = this.messages.slice();
  //        this.messageChangedEvent.next(this.messagesListClone);
  //        console.log(messages);
  //     },
  //     // error method
  //     error: (error: any) => {
  //       console.error(error);
  //     }, 
  //  })
   
  // }

  getMessages(): void {
    // contacts are a prerequisite for messages.
    // if (this.contactService.noContacts()) {
    //   this.contactService.getContacts();
    // }
    this.http.get('http://localhost:3000/messages')
    .subscribe({
      next: (messageData: {message: string, messages: Message[]}) => {
        {
          // the populate() method at the server pulled down full contact
          // information based on the foreign key of the sender.
          // We only need the friendly id of the sender.
          for (let msg of messageData.messages) {
            if (msg.sender) {
              msg.sender = msg.sender['id'];
            }
          }
          // purge messages with missing senders  
          // this.messages = messageData.messages;
          // for (let msg of this.messages) {
          //   if (!msg.sender) {
          //     this.deleteMessage(msg);
          //   }
          // }

          this.messagesListClone = this.messages.slice();
          this.messageChangedEvent.next(this.messagesListClone);
          console.log(this.messages);
        }
      }
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
