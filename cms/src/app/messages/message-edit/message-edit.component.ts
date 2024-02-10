import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit{
  @Output() addMessageEvent = new EventEmitter<Message>();

  @ViewChild('subject') subject:ElementRef;
  @ViewChild('msgText') msgText:ElementRef;

  // currentSender: string = 'Emily Castillo';

  constructor(private messageService: MessagesService){}

  ngOnInit() {
    
  }

  onSendMessage(){
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const newMessage = new Message('1', subject, msgText, '0');
    // this.addMessageEvent.emit(message);
    this.messageService.addMessage(newMessage);

  }

  onClear(){
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
