import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';


const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'update-user/:id', component: UserUpdateComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'logout', component: UserLogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
