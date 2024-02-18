import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
// class input 
export class DocumentDetailComponent {
  document: Document; 
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentsService,
    private route: ActivatedRoute, 
    private router: Router,
    private windRefService: WindRefService
    ){}

  ngOnInit(){
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );
    this.nativeWindow = this.windRefService.getNativeWindow()
  }

  OnView(){
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    // route back to the '/documents' URL
    this.router.navigate(['/documents'], {relativeTo: this.route});
    console.log('deleted');
 }
}
