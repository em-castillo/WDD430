import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>;

  private contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();

  maxContactId: number;
  contactsListClone: Contact[];


  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

  //return contact list
  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  // get specific contact
  getContact(id: string): Contact{
   return this.contacts.find((c) => c.id === id);
  }

  getMaxId(): number {

    let maxId = 0;
    let currentId = 0;
  
    this.contacts.forEach(contact => {
      //convert document.id into a number
        currentId = +contact.id
        if (currentId > maxId) {
            maxId = currentId;
   }
  })
  return maxId;
}

  addContact(newContact: Contact) {
    if (!newContact) {
        return;
    }
  
    this.maxContactId++;
    // toString() converts number to string
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;
    }
  
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }
  
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }
  

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
 }
}
