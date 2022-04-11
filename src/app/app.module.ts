import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http'
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CheckboxModule} from 'primeng/checkbox';
import { HeaderComponent } from './views/header/header.component';
import { UserAddComponent } from './views/user-add/user-add.component';
import { UsersListComponent } from './views/users-list/users-list.component';
import { JobsListComponent } from './views/jobs-list/jobs-list.component';
import { JobsAddComponent } from './views/jobs-add/jobs-add.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserAddComponent,
    UsersListComponent,
    JobsListComponent,
    JobsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    CardModule,
    FormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,


  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
