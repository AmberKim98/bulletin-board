import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { HeaderComponent } from './components/layouts/header/header.component';
import { PostsListComponent } from './components/posts/posts-list/posts-list.component';
import { PostCreateConfirmComponent } from './components/posts/post-create-confirm/post-create-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserCreateConfirmComponent } from './components/users/user-create-confirm/user-create-confirm.component';
import { UserCreateUpdateComponent } from './components/users/user-create-update/user-create-update.component';
import { UploadCSVComponent } from './components/posts/upload-csv/upload-csv.component';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';
import { PostsCreateUpdateComponent } from './components/posts/posts-create-update/posts-create-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PostsListComponent,
    PostCreateConfirmComponent,
    ConfirmDialogComponent,
    FooterComponent,
    UsersListComponent,
    UserCreateConfirmComponent,
    UserCreateUpdateComponent,
    UploadCSVComponent,
    ChangePasswordComponent,
    PostsCreateUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
