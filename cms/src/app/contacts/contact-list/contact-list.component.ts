import { Component,   EventEmitter,   OnDestroy,   OnInit, Output } from '@angular/core';
import {Contact} from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  term: string;

  contacts: Contact[] = [
    // new Contact(
    //   '1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', undefined
    // ),
    // new Contact(
    //   '2', 'R. Rex Barzee Jackson', 'barzeer@byui.edu@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', undefined
    // )
  ];

  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  search(value: string) {
    this.term = value;
    }

  // emit the contactSelectedEvent with Contact object passed
  onSelected(contact: Contact){
    this.contactsService.contactSelectedEvent.emit(contact);
  }

  // inject ContactService into the ContactListComponent class
  constructor(private contactsService: ContactsService){}

  // call getContacts() and assign the array of contacts returned 
  ngOnInit(){
  this.contactsService.getContacts();
    
  this.subscription = this.contactsService.contactListChangedEvent
    .subscribe(
      (contactList: Contact[]) => {
        // this.docChangeEvent = document;
        // this.contacts = this.contactsService.getContacts();
        this.contacts = contactList;
      }
      );
      // this.contacts = this.contactsService.getContacts();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  


}
