import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { HeaderComponent } from './components/layouts/header/header.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { PostCreateConfirmComponent } from './pages/posts/post-create-confirm/post-create-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserCreateConfirmComponent } from './pages/users/user-create-confirm/user-create-confirm.component';
import { UserCreateUpdateComponent } from './pages/users/user-create-update/user-create-update.component';
import { UploadCSVComponent } from './pages/posts/upload-csv/upload-csv.component';
import { ChangePasswordComponent } from './pages/users/change-password/change-password.component';
import { PostsCreateUpdateComponent } from './pages/posts/posts-create-update/posts-create-update.component';
import { PermissionDeniedComponent } from './components/permissionDenied/permission-denied/permission-denied.component';

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
    PostsCreateUpdateComponent,
    PermissionDeniedComponent
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
