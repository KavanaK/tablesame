import { ShContextService } from './sh-context-service';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import {IShContextMenuItem, IShContextOptions} from './sh-context-menu.models';

export interface ShContextPosition {
  top: number;
  left: number;
}

@Component({
  selector: 'sh-context-menu',
  templateUrl: './sh-context-menu.component.html',
  styleUrls: ['./sh-context-menu.component.scss']
})
export class ShContextMenuComponent implements OnInit, AfterContentInit {
  @Input() position: ShContextPosition;
  @Input() items: IShContextMenuItem[];
  @Input() dataContext: any;
  @Output() onClose = new EventEmitter();

  options: IShContextOptions;

  @ViewChild('childRef',{static: false}) childRef: ElementRef;

  constructor(
    private ctxService: ShContextService
  ) { }

  ngOnInit(): void {
    this.options = this.ctxService.getOptions();
  }

  ngAfterContentInit(): void {
    if (this.options.rtl) {
      this.setRtlLocation();
    } 
  }

  close() {
    this.onClose.emit();
  }

  onClick(item: IShContextMenuItem) {
    if (this.isItemDisabled(item))
      return;

    if (item.onClick) {
      item.onClick({
        menuItem: item,
        dataContext: this.dataContext
      });
      this.close();
    }
  }

  isItemDisabled(item: IShContextMenuItem) {
    if (!item.disabled)
      return false;

    return item.disabled(this.dataContext);
  }

  isItemVisible(item: IShContextMenuItem) {
    if (!item.visible)
      return true;

    return item.visible(this.dataContext);
  }

  setRtlLocation() {
    const elmRect: ClientRect =
      this.childRef.nativeElement.getClientRects()[0];

    this.position.left = this.position.left - elmRect.width;
  }
}
