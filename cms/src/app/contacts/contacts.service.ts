import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactSelectedEvent = new EventEmitter<Contact>();

  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  //return contact list
  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  // get specific contact
  getContact(id: string): Contact{
   return this.contacts.find((c) => c.id === id);
  }
}
