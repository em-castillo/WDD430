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

  maxContactId: number = 0;
  contactsListClone: Contact[];


  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

   ngOnInit() {
    this.getContacts();
  }

  sortContacts(){
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
  }

  //return contact list
  getContacts(): any {
    // return this.contacts.slice();
    this.http.get('http://localhost:3000/contacts')
    .subscribe({
      // success method
      next: (contactData: {message: string, contacts: Contact[] }) => {
         this.contacts = contactData.contacts;
         this.maxContactId = this.getMaxId();
         this.sortContacts();
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
    // let currentId = 0;
  
    this.contacts.forEach(contact => {
      //convert document.id into a number
        const currentId = +contact.id
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
  this.http.put('http://localhost:3000/contacts',
  contactString, httpHeaders)
  .subscribe(response => {
    this.contactListChangedEvent.next(this.contacts.slice());
  })
}

  addContact(newContact: Contact) {
    if (!newContact) {
        return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ msg: string, contact: Contact }>('http://localhost:3000/contacts',
    newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortContacts();
        }
      );
  
  //   this.maxContactId++;
  //   // toString() converts number to string
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   // this.contactsListClone = this.contacts.slice();
  //   // this.contactListChangedEvent.next(this.contactsListClone);
  //   this.storeContacts();
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;
    }
  
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortContacts();
        }
      );
  
    // newContact.id = originalContact.id;
    // this.contacts[pos] = newContact;
    // // this.contactsListClone = this.contacts.slice();
    // // this.contactListChangedEvent.next(this.contactsListClone);
    // this.storeContacts();
  }
  

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortContacts();
        }
      );


    // this.contacts.splice(pos, 1);
    // // this.contactListChangedEvent.next(this.contacts.slice());
    // this.storeContacts();
 }
}
