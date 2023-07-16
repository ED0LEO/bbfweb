import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserLogoutComponent } from './components/user-logout/user-logout.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'logout', component: UserLogoutComponent },
  { path: 'user-login', component: UserLoginComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'update-user/:id', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
