import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderService } from './services/loading.service';
import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';

//Import all material modules
import { MaterialModule } from './material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

// prime ng
import { HeaderComponent } from './header/header.component';
import { RecipeManagementModule } from './recipe-management/recipe-management.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountService } from './services/account.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastMessageService } from './services/message.service';
import { MessageService } from 'primeng/api';
import { UserComponent } from './user/user.component';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpinnerComponent,
    UserComponent,
  ],
  imports: [
    RecipeManagementModule,
    AuthenticationModule,
    AccountModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    MessagesModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    AvatarGroupModule,
    AvatarModule,

    MatProgressSpinnerModule,
    MatButtonModule,

    FullCalendarModule,
    PaginatorModule,
    MessageModule,
    ToastModule

  ],
  providers: [
    AccountService,
    LoaderService,
    ToastMessageService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
