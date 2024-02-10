import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{
  selectedContact: Contact;

  // inject the ContactService
  constructor(private contactsService: ContactsService){

  }

  // subscribe to the contactSelectedEvenT
  ngOnInit() {
    this.contactsService.contactSelectedEvent
    .subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
      );
  }

}
