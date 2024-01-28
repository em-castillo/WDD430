import { Component, Input } from '@angular/core';
import {Contact} from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  // contacts: Contact[] = [
  //   new Contact(
  //     '1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', undefined
  //   )
    // new Contact(
    //   '2', 'R. Rex Barzee Jackson', 'barzeer@byui.edu@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', undefined
    // )
  // ];

  @Input() contact:Contact;

}
