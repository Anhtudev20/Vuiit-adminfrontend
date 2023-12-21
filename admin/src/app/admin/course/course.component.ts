import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Course, SearchTemp, pagination } from '../../class/class';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../../api/image-uploader.service';
import { environment } from '../../../environments/environment';
import { CourseApiService } from './course.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @ViewChild('modalCourse') CourseModal: TemplateRef<any>;

  typeModal: string;
  public Editor:any = ClassicEditor;

  constructor(
    private api: CourseApiService,
    public http: HttpClient,
    private modalService: NgbModal,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  public filepath = environment.apiUrl + 'file/';
  public currentSelectedCourse: Course = { id: '' };
  isSearchDivVisible: boolean = false;
  isSearching: boolean = false;

  changeExtendSearchDivVisible() {
    this.isSearchDivVisible = !this.isSearchDivVisible;
  }

  public data: Course[] = [];
  public searchObject: SearchTemp = {
    name: ''
  };

  public page: pagination = {
    currentPage: 1,
    pageSize: 20
  };

  addToBrowser(course: Course) {
    this.data.push(course);
  }

  updateToBrowser(course: Course) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === course.id) {
        this.data[i] = course;
        break;
      }
    }
  }

  public totalData: number = 0;

  fetchData() {
    if (this.isSearching) {
      this.api.searchCourses(this.searchObject, this.page.currentPage, this.page.pageSize).subscribe(
        result => {
          this.data = result.results;
          this.totalData = result.totalCount;
        }
      );
    } else {
      this.api.getCoursesByPage(this.page.currentPage, this.page.pageSize).subscribe((result) => {
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
      this.api.delete(this.currentSelectedCourse.id).subscribe(result => {
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

  public openCourseModal(typeModal: string, course?: Course) {
    this.typeModal = typeModal;
    this.modalService.open(this.CourseModal);

    if (this.typeModal === 'create') {
      this.currentSelectedCourse = new Course();
    }
    if (this.typeModal === 'edit') {
      this.currentSelectedCourse = course;
    }
  }

  public getById(id: string) {
    this.api.getById(id).subscribe(
      result => {
        this.currentSelectedCourse = result.course;
      }
    );
  }

  public Refresh() {
    console.log(this.currentSelectedCourse.detail)

    this.currentSelectedCourse = new Course();
  }

  public async createToServer() {
    if(this.currentSelectedCourse.courseFor == "student"){
      this.currentSelectedCourse.allowedTeachingCourse = "none";
    }
    console.log(this.currentSelectedCourse)
    this.api.addNew(this.currentSelectedCourse).subscribe(result => {
      if (result.message !== 'success') {
        alert('Thêm mới thất bại');
      }
      if (result.message === 'success') {
        alert('Thêm mới thành công');
        this.currentSelectedCourse = result.obj;
        this.addToBrowser(this.currentSelectedCourse);
      }
    });
  }

  public async updateToServer() {
    if(this.currentSelectedCourse.courseFor == "student"){
      this.currentSelectedCourse.allowedTeachingCourse = "none";
    }
    this.api.update(this.currentSelectedCourse).subscribe(result => {
      if (result.message !== 'success') {
        alert('Sửa thất bại');
      }
      if (result.message === 'success') {
        alert('Sửa thành công');
        this.currentSelectedCourse = result.obj;
        this.updateToBrowser(this.currentSelectedCourse);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(response => {
      this.currentSelectedCourse.image = response.filename;
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentSelectedCourse.importFile = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
 
}
