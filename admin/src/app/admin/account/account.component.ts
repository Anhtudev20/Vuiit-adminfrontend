import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AccountApiService } from './account-api.service';
import { Account, Person, SearchTemp, pagination } from '../../class/class';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../../api/image-uploader.service';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  @ViewChild('modalAccount') AccountModal: TemplateRef<any>;

  typeModal: string;
  formattedDate: string;
  constructor(private api: AccountApiService,
    public http: HttpClient, private modalService: NgbModal,private fileUploadService: FileUploadService, private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  public filepath = environment.apiUrl + "file/"
  public currentSelectedAccount: Account = {id:""};
  isSearchDivVisible:boolean = false;
  isSearching: boolean = false;
  changeExtendSearchDivVisible(){
    this.isSearchDivVisible = !this.isSearchDivVisible;
  }
  public data: Account[] = [];
  public searchObject: SearchTemp = {
    lastname: '',
    phonenumber: ''
  };

  statusMeaning: Array<string> = [ "Hoạt động", "Không hoạt động"];
  public page: pagination = {
    currentPage: 1,
    pageSize: 20
  };

  addToBrowser(service: Account) {
    this.data.push(service);
  }
  updateToBrowser(service: Account) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == service.id) {
        this.data[i] = service;
        break;
      }
    }
  }
  public totalData: number = 0;
  
  
  fetchData() {
    if (this.isSearching == true) {
      this.api.searchAccounts(this.searchObject, this.page.currentPage,this.page.pageSize).subscribe(
        result => {
            this.data = result.results;
            this.totalData = result.totalCount;
        })
    }
    else {
      this.api.getAccountsByPage(this.page.currentPage,this.page.pageSize).subscribe((result) => {
        this.data = result.results;
        this.totalData = result.totalCount;
        console.log(this.totalData)
      }
      );
    }
  }

  renderPage(event: number) {
    this.page.currentPage = event;
    this.fetchData();
  }

 

  delete(id: string) {
    const cf = confirm("Bạn có chắc chắn muốn xóa không?");
    if (cf) {
      this.api.delete(this.currentSelectedAccount.id, this.currentSelectedAccount.person.id).subscribe(result => {
        if (result.message != "success") {
          alert("Không tìm được đối tượng");
          console.log(result.details);
        }
        if (result.message == "success") {
          alert("Xóa thành công");
          this.deleteDataInBrowser(id);
        }
      })
    }
  }
  search() {
      this.isSearching = true;
      this.page.currentPage = 1;
      this.fetchData();
  }
  resetSearching(){
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

  public openAccountModal(typeModal: string, account?: Account) {
    this.typeModal = typeModal;
    this.modalService.open(this.AccountModal);


    if (this.typeModal == 'create') {
      this.currentSelectedAccount = new Account();
      this.currentSelectedAccount.person = new Person();
    }
    if (this.typeModal == 'edit') {
      
      this.currentSelectedAccount = account;
       this.formattedDate = this.datepipe.transform(this.currentSelectedAccount.person.birthday, 'yyyy-MM-dd');

    }
  }

  public getById(id: string) {
    this.api.getById(id).subscribe(
      result => {
        this.currentSelectedAccount = result.Account;
      }
    )
   
  }

  public Refresh() {
    this.currentSelectedAccount = new Account();
  }
  public async createToServer() {
    this.api.addNew(this.currentSelectedAccount).subscribe(result => {
      if (result.message != "success") {
        alert("Thêm mới thất bại")
      }
      if (result.message == "success") {
        alert("Thêm mới thành công")
        this.currentSelectedAccount = result.obj;
        this.addToBrowser( this.currentSelectedAccount);
      }
    })
  }

  public async updateToServer(){
    this.api.update(this.currentSelectedAccount).subscribe(result => {
      if (result.message != "success") {
        alert("Sửa thất bại")
      }
      if (result.message == "success") {
        alert("Sửa thành công")
        this.currentSelectedAccount = result.obj;
        this.updateToBrowser(this.currentSelectedAccount)
      }
    })
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(response => {
        
      this.currentSelectedAccount.person.image = response.filename;
      });

    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
         
            this.currentSelectedAccount.person.importfile = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
}
