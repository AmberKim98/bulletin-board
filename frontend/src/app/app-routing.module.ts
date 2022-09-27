import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PostCreateConfirmComponent } from './pages/posts/post-create-confirm/post-create-confirm.component';
import { PostsCreateUpdateComponent } from './pages/posts/posts-create-update/posts-create-update.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { UploadCSVComponent } from './pages/posts/upload-csv/upload-csv.component';
import { ChangePasswordComponent } from './pages/users/change-password/change-password.component';
import { UserCreateConfirmComponent } from './pages/users/user-create-confirm/user-create-confirm.component';
import { UserCreateUpdateComponent } from './pages/users/user-create-update/user-create-update.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserGuard } from './guards/user/user.guard';
import { PermissionGuard } from './guards/permission/permission.guard';
import { PermissionDeniedComponent } from './components/permissionDenied/permission-denied/permission-denied.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'posts/detail/:id',
    pathMatch: 'full',
    component: PostsCreateUpdateComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'posts/create',
    component: PostsCreateUpdateComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'posts/create/confirm',
    component: PostCreateConfirmComponent,
    pathMatch: 'full',
    canActivate: [UserGuard]
  },
  {
    path: 'posts/edit/confirm',
    pathMatch: 'full',
    component: PostCreateConfirmComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'posts/edit/:id',
    component: PostsCreateUpdateComponent,
    pathMatch: 'full',
    canActivate: [UserGuard]
  },
  {
    path: 'posts/upload-csv',
    component: UploadCSVComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    pathMatch: 'full',
    canActivate: [UserGuard, PermissionGuard]
  },
  {
    path: 'users/create',
    component: UserCreateUpdateComponent,
    canActivate: [UserGuard, PermissionGuard]
  },
  {
    path: 'users/detail/:id',
    component: UserCreateUpdateComponent,
    pathMatch: 'full',
    canActivate: [UserGuard]
  },
  {
    path: 'users/create/confirm',
    component: UserCreateConfirmComponent,
    pathMatch: 'full',
    canActivate: [UserGuard]
  },
  {
    path: 'users/edit/confirm',
    component: UserCreateConfirmComponent,
    pathMatch: 'full',
    canActivate: [UserGuard]
  },
  {
    path: 'users/edit/:id',
    component: UserCreateUpdateComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'users/edit/:id/change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'users/permission-denied',
    component: PermissionDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
