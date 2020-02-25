import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
//import { ShContextSubMenuDirective } from './external/sh-context-menu/sh-context-sub-menu.directive';
//import{ShContextMenuDirective} from './external/sh-context-menu/sh-context-menu.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationsComponent } from './core/animations/animations.component';
import { ButtonComponent } from './core/button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    AnimationsComponent,
    ButtonComponent,
  
   // ShContextMenuDirective,
   // ShContextSubMenuDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
