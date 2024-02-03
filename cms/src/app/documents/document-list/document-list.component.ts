import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1', 'Document name 1', 'Document description 1', 'www.document1.com'
    ),
    new Document(
      '2', 'Document name 2 ', 'Document description 2', 'www.document2.com'
    ),
    new Document(
      '3', 'Document name 3', 'Document description 3', 'www.document3.com'
    ),
    new Document(
      '4', 'Document name 4', 'Document description 4', 'www.document4.com'
    ),
  ];

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
