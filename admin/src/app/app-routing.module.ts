import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './admin/shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './admin/account/account.component';
import { CourseComponent } from './admin/course/course.component';
import { LessonComponent } from './admin/lesson/lesson.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"adminaccount", component:AccountComponent},
  {path:"admincourse", component:CourseComponent},
  {path:"adminlesson/:courseId", component:LessonComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
