import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostCreateConfirmComponent } from './components/posts/post-create-confirm/post-create-confirm.component';
import { PostsCreateUpdateComponent } from './components/posts/posts-create-update/posts-create-update.component';
import { PostsListComponent } from './components/posts/posts-list/posts-list.component';
import { UploadCSVComponent } from './components/posts/upload-csv/upload-csv.component';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';
import { UserCreateConfirmComponent } from './components/users/user-create-confirm/user-create-confirm.component';
import { UserCreateUpdateComponent } from './components/users/user-create-update/user-create-update.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserGuard } from './guards/user.guard';

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
    canActivate: [UserGuard]
  },
  {
    path: 'users/create',
    component: UserCreateUpdateComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'user-create-confirm',
    component: UserCreateConfirmComponent,
    canActivate: [UserGuard]
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
