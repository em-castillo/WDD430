import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService{
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>;

  //class variable whose data type is an array
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();

  maxDocumentId: number;
  documentsListClone: Document[];

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id: string): Document{
   return this.documents.find((c) => c.id === id);
  }

 getMaxId(): number {

  let maxId = 0;
  let currentId = 0;

  this.documents.forEach(document => {
    //convert document.id into a number
      currentId = +document.id
      if (currentId > maxId) {
          maxId = currentId
 }
})

  return maxId;
}

addDocument(newDocument: Document) {
  if (!newDocument) {
      return;
  }

  this.maxDocumentId++;
  // toString() converts number to string
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  this.documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(this.documentsListClone);
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
      return;
  }

  const pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
      return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  this.documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(this.documentsListClone);
}

deleteDocument(document: Document) {
  if (!document) {
     return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
     return;
  }
  this.documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(this.documentsListClone);
}


}
