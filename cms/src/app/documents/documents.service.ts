import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(){
    // return this.documents.slice();
    return this.http.get<Document[]>('https://cms-project-bf086-default-rtdb.firebaseio.com/documents.json')
    .subscribe({
      // success method
      next: (documents: Document[] ) => {
         this.documents = documents;
         this.maxDocumentId = this.getMaxId();
         this.documents.sort((a,b)=> {
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
         this.documentsListClone = this.documents.slice();
         this.documentListChangedEvent.next(this.documentsListClone);
      },
      // error method
      error: (error: any) => {
        console.error(error);
      }, 
   })
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
            maxId = currentId;
  }
  })

    return maxId;
  }

  storeDocuments() {
    const docString = JSON.stringify(this.documents);
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http.put('https://cms-project-bf086-default-rtdb.firebaseio.com/documents.json',
    docString, httpHeaders)
    .subscribe(response => {
      this.documentListChangedEvent.next(this.documents.slice());
    })
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
        return;
    }

    this.maxDocumentId++;
    // toString() converts number to string
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // this.documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(this.documentsListClone);
    this.storeDocuments();
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
    // this.documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(this.documentsListClone);
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1)
    // this.documentsListClone = this.documents.slice()
    // this.documentListChangedEvent.next(this.documentsListClone)
    this.storeDocuments();
  }


}
