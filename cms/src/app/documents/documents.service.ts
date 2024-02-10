import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService{
  documentSelectedEvent = new EventEmitter<Document>();

  //class variable whose data type is an array
  private documents: Document[] = [];


  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id: string): Document{
   return this.documents.find((c) => c.id === id);
  }
}
