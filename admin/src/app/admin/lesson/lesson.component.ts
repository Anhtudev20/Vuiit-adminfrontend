import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson, SearchTemp, pagination } from '../../class/class';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../../api/image-uploader.service';
import { LessonApiService } from './lesson-api.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {
  sanitizedImportFile: any;

  constructor(
    private api: LessonApiService,
    public http: HttpClient,
    private modalService: NgbModal,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
      this.searchObject.id =  this.route.snapshot.paramMap.get('courseId').toString();
      console.log( this.searchObject.id)
      this.delay(2000).then(() => {
this.fetchData();
         });

    ;
  }
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  @ViewChild('modalLesson') LessonModal: TemplateRef<any>;

  typeModal: string;
  public Editor:any = ClassicEditor;
  public filepath = environment.apiUrl + 'file/';
  public currentSelectedLesson: Lesson = { id: '' };
  isSearchDivVisible: boolean = false;
  isSearching: boolean = false;

  changeExtendSearchDivVisible() {
    this.isSearchDivVisible = !this.isSearchDivVisible;
  }

  public data: Lesson[] = [];
  public searchObject: SearchTemp = {
    id:'',
    name: ''
  };

  public page: pagination = {
    currentPage: 1,
    pageSize: 20
  };

  addToBrowser(Lesson: Lesson) {
    this.data.push(Lesson);
  }

  updateToBrowser(Lesson: Lesson) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === Lesson.id) {
        this.data[i] = Lesson;
        break;
      }
    }
  }

  public totalData: number = 0;

  fetchData() {
    if (this.isSearching) {
      this.api.searchLessonsByCourseIdAndName(this.searchObject, this.page.currentPage, this.page.pageSize).subscribe(
        result => {
          this.data = result.results;
          this.totalData = result.totalCount;
        }
      );
    } else {
      this.api.getLessonsByPage(this.searchObject.id,this.page.currentPage, this.page.pageSize).subscribe((result) => {
        this.data = result.results;
        this.totalData = result.totalCount;
      });
    }
  }

  renderPage(event: number) {
    this.page.currentPage = event;
    this.fetchData();
  }

  delete(id: string) {
    const cf = confirm('Bạn có chắc chắn muốn xóa không?');
    if (cf) {
      this.api.deleteLesson(this.currentSelectedLesson.id).subscribe(result => {
        if (result.message !== 'success') {
          alert('Không tìm được đối tượng');
          console.log(result.details);
        }
        if (result.message === 'success') {
          alert('Xóa thành công');
          this.deleteDataInBrowser(id);
        }
      });
    }
  }

  search() {
    this.isSearching = true;
    this.page.currentPage = 1;
    this.fetchData();
  }

  resetSearching() {
    this.isSearching = false;
    this.page.currentPage = 1;
    this.fetchData();
  }

  deleteDataInBrowser(id: string) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        this.data.splice(i, 1);
        this.totalData -= 1;
      }
    }
  }

  public openLessonModal(typeModal: string, lesson?: Lesson) {
    this.typeModal = typeModal;
    this.modalService.open(this.LessonModal);

    if (this.typeModal === 'create') {
      this.currentSelectedLesson = new Lesson();
    }
    if (this.typeModal === 'edit') {
      this.currentSelectedLesson = lesson;
      this.sanitizedImportFile = this.filepath + this.currentSelectedLesson.slideUrl;
    }
  }

  public getById(id: string) {
    this.api.getByLessonId(id).subscribe(
      result => {
        this.currentSelectedLesson = result.Lesson;
        this.sanitizedImportFile = this.filepath + this.currentSelectedLesson.slideUrl;
        console.log(this.sanitizedImportFile)
      }
    );
  }

  public Refresh() {

    this.currentSelectedLesson = new Lesson();
  }

  public async createToServer() {
    this.currentSelectedLesson.courseId = this.searchObject.id;

    console.log(this.currentSelectedLesson)
    this.api.insertLesson(this.currentSelectedLesson).subscribe(result => {
      if (result.message !== 'success') {
        alert('Thêm mới thất bại');
      }
      if (result.message === 'success') {
        alert('Thêm mới thành công');
        this.currentSelectedLesson = result.obj;
        this.addToBrowser(this.currentSelectedLesson);
      }
    });
  }

  public async updateToServer() {
   this.currentSelectedLesson.courseId = this.searchObject.id;
    this.api.updateLesson(this.currentSelectedLesson).subscribe(result => {
      if (result.message !== 'success') {
        alert('Sửa thất bại');
      }
      if (result.message === 'success') {
        alert('Sửa thành công');
        this.currentSelectedLesson = result.obj;
        this.updateToBrowser(this.currentSelectedLesson);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(response => {
      this.currentSelectedLesson.slideUrl = response.filename;
      this.sanitizedImportFile = this.filepath + this.currentSelectedLesson.slideUrl;
    });

    
  }
 
}
