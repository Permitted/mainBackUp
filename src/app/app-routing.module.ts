import { NgModule } from '@angular/core';
// Routes
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomePageComponent } from './ui/home-page/home-page.component';
import { UserRegisterComponent } from './ui/user-register/user-register.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { AdminPanelComponent} from './ui/admin-panel/admin-panel.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { ProjectsComponent } from './ui/projects/projects.component';
import { CreateProjectComponent } from './ui/create-project/create-project.component';
import { JoinProjectComponent } from './ui/join-project/join-project.component';
// Auth Guard
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {path: 'UserLogin', component: UserLoginComponent},
  {path: 'HomePage', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'AdminPanel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: 'UserProfile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'Projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'JoinProject', component: JoinProjectComponent, canActivate: [AuthGuard]},
  {path: 'CreateProject', component: CreateProjectComponent, canActivate: [AuthGuard]},
  {path: 'UserRegister', component: UserRegisterComponent},
  {path: '', redirectTo: 'UserLogin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
