import { Component, OnInit } from '@angular/core';
// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// Form Builder
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';



export interface Pcreator { projectNameHolder: string; hostID: string; }

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})



export class ProjectsComponent implements OnInit {
  // Values
  public userID: string;  // User ID
  userMail: string;
  textQN = '';  // Text question number
  multiQN = ''; // Multiple choice question number
  rateQN = '';  // Rate question number
  projectName = '';  // Project name
  success = false; // Creation checker
  actionName = ''; // Action holder
  currentProject: any = ''; // Current Project Holder
  isCurrentProject = false; // Current Project Checker

  // Database value holders
  answersProject: Observable<any[]>;
  allProjects: Observable<any[]>;
  userInfo: Observable<any[]>;
  allUsers: Observable<any[]>;
  questionHolder: Observable<any[]>;

  constructor(private fb: FormBuilder,
              public afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService) { }

  // Form creation with values
  ngOnInit() {
    // Current user ID
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Get current user id
        this.userID = user.uid;
        // Project information creation
        this.allProjects = this.afs.collection('users').doc(this.userID).collection('questions').valueChanges();
        this.userInfo = this.afs.collection('users', ref => ref.where('uid', '==', this.userID)).valueChanges();
      }
    });
    this.allUsers = this.afs.collection('users').valueChanges();
  }

  // Set the project name
  setProjectName(holder: string) {
    this.currentProject = holder;
  }

  // UpdateName
  sendInvitation(id: string, hold: string) {

        // tslint:disable-next-line:max-line-length
        this.afs.collection('users').doc(id).collection('invitation').doc(this.currentProject).set({ projectName: this.currentProject, hostID: hold});
        console.log(hold);
        this.toastr.success('Success');
  }



  async onSubmit() {
  }
}



