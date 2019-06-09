// Main
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Firebase Modules & Enviroment
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Routing & Auth & Guard
import { AuthService } from './core/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './core/auth.guard';

// App Components
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './ui/user-register/user-register.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { AdminPanelComponent } from './ui/admin-panel/admin-panel.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { ProjectsComponent } from './ui/projects/projects.component';

// Forms
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './ui/footer/footer.component';
import { JoinProjectComponent } from './ui/join-project/join-project.component';
import { CreateProjectComponent } from './ui/create-project/create-project.component';

// Scroller
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    HomePageComponent,
    UserLoginComponent,
    NavBarComponent,
    AdminPanelComponent,
    UserProfileComponent,
    ProjectsComponent,
    FooterComponent,
    JoinProjectComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'senior-project'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
