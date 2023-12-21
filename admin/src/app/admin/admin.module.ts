import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseComponent } from './course/course.component';
import { RouterModule } from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DomSanitizer} from '@angular/platform-browser';
import { SafePipe } from '../api/safepipe';
import { NgxDocViewerModule } from 'ngx-doc-viewer';



@NgModule({
  declarations: [
    HeaderComponent,
    AccountComponent,
    CourseComponent,
    LessonComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CKEditorModule,
    NgxPaginationModule,
    RouterModule,
    NgxDocViewerModule
  ],
  exports:[HeaderComponent]
})
export class AdminModule { }
