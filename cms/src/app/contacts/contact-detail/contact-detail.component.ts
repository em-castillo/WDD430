import { Component, Input, OnInit } from '@angular/core';
import {Contact} from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit{
  // contacts: Contact[] = [
  //   new Contact(
  //     '1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', undefined
  //   )
    // new Contact(
    //   '2', 'R. Rex Barzee Jackson', 'barzeer@byui.edu@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', undefined
    // )
  // ];

  contact:Contact;
  id: string;

  constructor(private contactsService: ContactsService,
    private route: ActivatedRoute, 
    private router: Router
    ){}

    ngOnInit(){
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactsService.getContact(this.id);
        }
      );
    }

      onDelete() {
        this.contactsService.deleteContact(this.contact);
        // route back to the '/contacts' URL
        this.router.navigate(['/contacts'], {relativeTo: this.route});
     }
    

}
