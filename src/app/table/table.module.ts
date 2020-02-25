import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableComponent} from './table.component';
//import{ShContextMenuDirective} from '../external/sh-context-menu/sh-context-menu.directive';
import { ModalComponent } from '../modal/modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    
  ],
  exports: [TableComponent]
})
export class JSONTableModule { }
