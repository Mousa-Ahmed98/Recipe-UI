// Components
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';

// Modules
import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { RecipeManagementModule } from './recipe-management/recipe-management.module';
import { AuthenticationModule } from './authentication/authentication.module';

// Services
import { LoaderService } from './services/loading.service';
import { ToastMessageService } from './services/message.service';
import { AuthenticationService } from './services/auth.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

// Angular stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material modules
import { MaterialModule } from './material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; 

// Prime ng
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// fullcalendar 
import { FullCalendarModule } from '@fullcalendar/angular';


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
    MatDialogModule,
    DialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TableModule,
    FullCalendarModule,
    PaginatorModule,
    MessageModule,
    ToastModule
  ],
  providers: [
    AuthenticationService,
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
