import { Component, OnInit } from '@angular/core';
// Firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
// Form Builder
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
// Auth
import { AngularFireAuth } from '@angular/fire/auth';
// Question & Answers Interace
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['./join-project.component.css']
})
export class JoinProjectComponent implements OnInit {

  // Form creation name
  userForm: FormGroup;

  // Values
  public userID: string;  // User ID
  textQN = '';  // Text question number
  multiQN = ''; // Multiple choice question number
  rateQN = '';  // Rate question number
  projectName = '';  // Project name
  success = false; // Creation checker

  // Database value holders
  answersProject: Observable<any[]>;
  allProjects: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
  }



  setName(projectN: string, location: HTMLBodyElement) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Get current user id
        this.userID = user.uid;
        console.log(this.userID);
        // Project information creation
        this.projectName = projectN;
        console.log(this.projectName);
        // tslint:disable-next-line:max-line-length
        this.answersProject = this.afs.collection('users').doc(this.userID).collection('questions', ref => ref.where('projectName', '==', this.projectName)).valueChanges();
        this.allProjects = this.afs.collection('users').doc(this.userID).collection('questions').valueChanges();
      }
    });
    console.log(this.userID);
  }


  ngOnInit() {
    // Current user ID
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Get current user id
        this.userID = user.uid;
        console.log(this.userID);
        // Project information creation
        // tslint:disable-next-line:max-line-length
        this.answersProject = this.afs.collection('users').doc(this.userID).collection('questions', ref => ref.where('projectName', '==', this.projectName)).valueChanges();
        this.allProjects = this.afs.collection('users').doc(this.userID).collection('questions').valueChanges();
      }
    });

    this.userForm = this.fb.group({
      textAnswer1: [, Validators.required],
      textAnswer2: [],
      textAnswer3: [],
      textAnswer4: [],
      textAnswer5: [],
      multiAnswer1: [],
      multiAnswer2: [],
      multiAnswer3: [],
      multiAnswer4: [],
      rateAnswer1: [],
      rateAnswer2: [],
      rateAnswer3: [],
      rateAnswer4: [],
      rateAnswer5: [],
    });
  }

  refresh(): void {
    setTimeout(location.reload.bind(location), 1500);
  }


  async onSubmit() {
    const proName = this.projectName;
    const formValue = this.userForm.value;

    // Sending form data to database
    try {
      await this.afs.collection('users').doc(this.userID).collection('questionsAnswer').doc(proName).set(formValue);
      await this.afs.collection('users').doc(this.userID).collection('questions').doc(proName).update({ isSend: true });
      this.success = true;
      this.toastr.success('Success');
      console.log('success');
    } catch (err) {
      this.toastr.error('Error');
      console.error(err);
    }
    this.refresh();
  }

}
