import { Component, OnInit } from '@angular/core';
import { ModalModule,BsModalService } from 'ngx-bootstrap/modal';

import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
