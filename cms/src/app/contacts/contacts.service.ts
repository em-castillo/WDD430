import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

  //return contact list
  getContacts(){
    // return this.contacts.slice();
    return this.http.get<Contact[]>('https://cms-project-bf086-default-rtdb.firebaseio.com/contacts.json')
    .subscribe({
      // success method
      next: (contacts: Contact[] ) => {
         this.contacts = contacts;
         this.maxContactId = this.getMaxId();
         this.contacts.sort((a,b)=> {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
         this.contactsListClone = this.contacts.slice();
         this.contactListChangedEvent.next(this.contactsListClone);
      },
      // error method
      error: (error: any) => {
        console.error(error);
      }, 
   })
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

storeContacts() {
  const contactString = JSON.stringify(this.contacts);
  const httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  this.http.put('https://cms-project-bf086-default-rtdb.firebaseio.com/contacts.json',
  contactString, httpHeaders)
  .subscribe(response => {
    this.contactListChangedEvent.next(this.contacts.slice());
  })
}

  addContact(newContact: Contact) {
    if (!newContact) {
        return;
    }
  
    this.maxContactId++;
    // toString() converts number to string
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // this.contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(this.contactsListClone);
    this.storeContacts();
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
    // this.contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(this.contactsListClone);
    this.storeContacts();
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
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
 }
}
