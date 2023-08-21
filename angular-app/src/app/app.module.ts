import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserLogoutComponent } from './components/user-logout/user-logout.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthService } from './services/auth.service';
import { ErrorComponent } from './components/error/error.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { UserService } from './services/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { StyleService } from './services/style.service';
import { TimeScheduleComponent } from './components/time-schedule/time-schedule.component';
import { HabitTrackerComponent } from './components/habit-tracker/habit-tracker.component';
import { HabitService } from './services/habit.service';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    TaskListComponent,
    UserLogoutComponent,
    UserLoginComponent,
    AuthComponent,
    ErrorComponent,
    RewardsComponent,
    DashboardComponent,
    CalendarComponent,
    TaskDetailsComponent,
    TimeScheduleComponent,
    HabitTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    AuthService,
    UserService,
    NotificationService,
    StyleService,
    HabitService,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {provide: MAT_DATE_LOCALE, useValue: 'gb-EN'},
    {
       provide: DateAdapter,
       useClass: MomentDateAdapter,
       deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
