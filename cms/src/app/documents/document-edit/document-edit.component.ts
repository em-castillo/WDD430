import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit{

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  @ViewChild('f') dlForm: NgForm;
  documentForm: FormGroup;


  constructor(private documentService: DocumentsService,
    private route: ActivatedRoute,
    private router: Router){
  }

  ngOnInit(): void {
    new FormGroup({
      'title': new FormControl(null, Validators.required),
      'url': new FormControl(null, Validators.required)
    })

    this.route.params
      .subscribe (
      (params: Params) => {
        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
    
        if (!this.originalDocument) {
          return;
        }
         this.editMode = true;
         // clone original document
         this.document = JSON.parse(JSON.stringify(this.originalDocument)); 
    }) 
    
  }

  onSubmit(form: NgForm){
  const value = form.value;
  this.document = new Document(value.id, value.name, value.description, value.url);
  if (this.editMode) {
    this.documentService.updateDocument(this.originalDocument, this.document);
  } else {
    this.documentService.addDocument(this.document);
  }
  this.router.navigate(['../'], {relativeTo: this.route});
}


  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
