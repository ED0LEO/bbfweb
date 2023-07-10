import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserAccountService } from './user-account.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    TaskListComponent,
    UserProfileComponent,
    UserSettingsComponent,
    UserLogoutComponent,
    UserLoginComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserAccountService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
