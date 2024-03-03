import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{

  groupContacts: Contact[] = [];
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  id: string;

  @ViewChild('f') clForm: NgForm;
  contactForm: FormGroup;

  constructor(private contactService: ContactsService,
    private route: ActivatedRoute,
    private router: Router){
  }

  ngOnInit(): void {
    // new FormGroup({
    //   'name': new FormControl(null, Validators.required),
    //   'email': new FormControl(null, Validators.required)
    // })

    this.route.params
      .subscribe (
      (params: Params) => {
        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(this.id);
    
        if (!this.originalContact) {
          return;
        }
         this.editMode = true;
         this.contact = JSON.parse(JSON.stringify(this.originalContact)); 
         if (this.groupContacts) {
          this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));
        }
    }) 
  }

  onSubmit(form: NgForm){
    const value = form.value;
    this.contact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
 }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer !== event.container) {
    const contactCopy = { ...event.item.data };
    this.groupContacts.push(contactCopy);
    }
    }

  onRemoveItem(index: number){
    if (index < 0 || index >= this.groupContacts.length) {
      return;
   }
   this.groupContacts.splice(index, 1);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
