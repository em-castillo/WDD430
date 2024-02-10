import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isUserDropdownOpen:boolean = false;
  isNavbarCollapsed:boolean = true;

  toggleUserDropdown(){
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  toggleNavbar(){
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  @Output() selectedFeatureEvent =  new EventEmitter<string>();

  onSelected(selectedEvent: string){
    this.selectedFeatureEvent.emit(selectedEvent);
  }

}
