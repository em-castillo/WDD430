import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit{
  // emit and output a custom event 
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  // variable named documents that is an array of document objects
  documents: Document[] = [
    // new Document(
    //   '1', 'Document name 1', 'Document description 1', 'www.document1.com'
    // ),
    // new Document(
    //   '2', 'Document name 2 ', 'Document description 2', 'www.document2.com'
    // ),
    // new Document(
    //   '3', 'Document name 3', 'Document description 3', 'www.document3.com'
    // ),
    // new Document(
    //   '4', 'Document name 4', 'Document description 4', 'www.document4.com'
    // ),
  ];

  constructor(private documentsService: DocumentsService){}

  ngOnInit(){
    this.documents = this.documentsService.getDocuments();
  }

  // method
  onSelectedDocument(document: Document){
    this.documentsService.documentSelectedEvent.emit(document);
  }

}
