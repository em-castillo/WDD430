import { TestBed } from '@angular/core/testing';

import { DocumentsService } from './documents.service';
import { Document } from './document.model';

describe('DocumentsService', () => {
  let documentService: DocumentsService;
  const mockDocuments: Document[] = [
    {
      id:'1',
      name: 'doc 1',
      url: 'docUrl.com',
      description:'doc 1'
    },
    {
      id:'2',
      name: 'doc 2',
      url: 'docUrl.com',
      description:'doc 2'
    }
  ]

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(DocumentsService);
    documentService = new DocumentsService();
    documentService['documents'] = mockDocuments.slice();
  });

  it('should delete a document', () => {
    
    //arrange
    const documentToDelete: Document = mockDocuments[0];
    const initialLength = documentService['documents'].length;

    //act
    documentService.deleteDocument(documentToDelete);

    //expect(service).toBeTruthy();
    //assert
    expect(documentService['documents'].length).toEqual(initialLength - 1);
    });

  
});
