import { Component, OnInit } from '@angular/core';
// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// Form Builder
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  // Values
  public userID: string;  // User ID
  textQN = '';  // Text question number
  multiQN = ''; // Multiple choice question number
  rateQN = '';  // Rate question number
  projectName = '';  // Project name
  success = false; // Creation checker
  actionName = ''; // Action holder

  // Database value holders
  answersProject: Observable<any[]>;
  allProjects: Observable<any[]>;
  userInfo: Observable<any[]>;

  constructor(private fb: FormBuilder,
              public afs: AngularFirestore,
              private afAuth: AngularFireAuth) { }

  // Form creation with values
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
        this.userInfo = this.afs.collection('users', ref => ref.where('uid', '==', this.userID)).valueChanges();
      }
    });
  }

  // Set the action name
  setAction(holder: string) {
    this.actionName = holder;
  }

  // UpdateName
  updateName(namer: string) {
    this.afs.collection('users').doc(this.userID).update({ 'info.name': namer });
    console.log('success');
  }

  // Update Surname
  updateSurname(namer: string) {
    this.afs.collection('users').doc(this.userID).update({ 'info.surname': namer });
    console.log('success');
  }
  // Update Age
  updateAge(namer: string) {
    this.afs.collection('users').doc(this.userID).update({ 'info.age': namer });
    console.log('success');
  }

  async onSubmit() {
  }
}
