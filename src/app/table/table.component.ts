import { Component,OnInit,EventEmitter, Input,  Output,HostBinding} from '@angular/core';
//import { IShContextMenuItem } from '../external/sh-context-menu/sh-context-menu.models';
import { BsModalService } from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {trigger,state,style,animate,transition,query,stagger} from '@angular/animations';
import { ButtonComponent } from '../core/button/button.component';
@Component({
  selector: 'json-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  /*animations: [
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]*/
})
export class TableComponent implements OnInit {
  constructor(private modalService: BsModalService) { }
     
  
  @Input() dataSource: any;
  @Input() headers: any;
  @Input() update: boolean;
  @Input() delete: boolean;

  @Output() deleteRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectRow: EventEmitter<any> = new EventEmitter<any>();
   // totalhero = -1;
  data: any = {};

  displayed = [];
  perpage = 10;
  total: number;
  page = 1;
   next=true;
   value :any;
  checked: any = [];
  checkAll = false;
  dialogue = false;
  dialogeData: any = {};
  bsModalRef: BsModalRef;
 // constructor(private modalService: BsModalService) {}
  public openModalWithComponent() {
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(ModalComponent);
  }
  pages(){
    if(this.page==1){
      this.nextPage();
  }
  else 
  {
    this.previousPage();
  }
}
pagination(){
  if(this.page>1){
    if(this.page<3){
    console.log("this is the current page");
    }
    }
  else{
    this.nextPage();
    this.page++;
  }
}



  ngOnInit() {
    this.processData();
    
//this.childContextMenu = [
 /* {
    label: '<i class="fa fa-eye fa-fw"></i>View',
    disabled: function (dataContext) { // disabled handler
      if(dataContext.entityRef.MimeType == "image/jpeg" || dataContext.entityRef.MimeType ==  "image/png"){
        return false;
      }
      else{
        return true;
      }
    },
    onClick: this.toggleModal.bind(this)
  },
  {
    label: '<i class="fa fa-arrows fa-fw"></i>Move',
    // Make this visible only where folders are in view
    visible: ctx => {
      return this.showSubDirectories === true;
    },
    onClick: this.onMoveEntityEvent
  },
  {
    label: '<i class="fa fa-share-alt fa-fw"></i>Manage share',
    onClick: this.onShareEvent
  },
  {
    //fileCollection.migrationSourceData !== null
    label: ' <i class="fa fa-hdd-o fa-lg fa-fw"></i>Migrate Out',
    visible: ctx => {
      return this.showMigrateOut === true;
    },
    onClick: this.migrateOut
  },
  {
    label: '<i class="fa fa-pencil-square-o fa-fw"></i>Rename',
    onClick: this.onRenameEvent
  },
  {
    label: '<i class="fa fa-cloud-download fa-fw"></i>Download',
    onClick: this.onDownloadEvent
  },
  {
    label: '<i class="fa fa-info-circle fa-fw"></i>Properties',
    onClick: this.onActivatePropertiesEvent
  },
  {
    label: '<i class="fa fa-trash fa-fw"></i>Delete',
    onClick: this.onDeleteEvent
  },
];*/
  }

  selected(e, id) {
    if (e.target.checked) {
      this.checked.push(id);
      
    }
  }

  deleteSelected() {
    if (this.checked.length > 0) {
      this.deleteRow.emit(this.checked);
      this.dataSource = this.dataSource.filter((value, index, array) => {
        return !this.checked.includes(value.id);
      });
      this.checked = [];
      this.paginate(this.page);
    }
  }

  totalItems() {
    if (this.total > this.perpage) {
      return Math.ceil(this.total / this.perpage);
    } else {
      return 1;
    }
  }

  paginate(page) {
    const start = (this.perpage * page) - this.perpage;
    const end = (this.perpage * page);
    // console.log(start, end);
    this.data['data'] = this.dataSource.slice(start, end);
    // console.log(this.data);
  }

  pageOnChange(perPage) {
    this.perpage = perPage;
    this.page = 1;
    //console.log(perPage);
    this.paginate(this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
    }

    this.paginate(this.page);
  }

  nextPage() {
    if (this.page + 1 <= this.totalItems()) {
      this.page++;
    }

    this.paginate(this.page);
  }

  showUpdate(id: any) {
    this.dialogue = true;
    // console.log('Showing the updates');
    this.data.data.forEach((value) => {
      if (value.id === id) {
        this.dialogeData = value;
      }
    });

  }

  closeDialogue() {
    this.dialogue ? this.dialogue = false : this.dialogue = true;
    this.dialogeData = {};
  }

  submitUpdateRow(dialogeData: any) {
    this.updateRow.emit(dialogeData);
  }

  private processData() {
    if (this.dataSource && this.dataSource.length > 0) {
      this.total = this.dataSource.length;

      if (this.headers.thead && this.headers.thead.length > 0) {
        this.data['headers'] = this.headers.thead;
        this.displayed = this.headers.displayed;
      } else {
        console.warn('No headers data for table provided');
      }

      this.paginate(this.page);
    } else {
      console.warn('No data for table provided');
    }
  }

  fireRowClick(row) {
    if (row) {
      this.selectRow.emit(row);
    }
  }
  

 // childContextMenu: IShContextMenuItem[];



  /**
   * Function to manage moving of files or folders
   *
   * @param {*} event
   * @memberof FileListLayoutComponent
   *//*
  onMoveEntityEvent(event: any) {
    const self: FileListLayoutComponent = event.dataContext.parentRef;
    self.toastr.info('Copied to clipboard', 'Info');
    self.clipboard = {
      entityRef: event.dataContext.entityRef,
      entityParentFolderRef: event.dataContext.entityParentFolderRef
    };
  }*/
}
