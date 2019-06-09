import { Component, OnInit } from '@angular/core';
// Firestore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
// Form Builder
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
// Auth
import { AngularFireAuth } from '@angular/fire/auth';





@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  // Form creation name
  QuestionsForm: FormGroup;

  // Values
  public userID: string;  // User ID
  textQN = '';  // Text question number
  multiQN = ''; // Multiple choice question number
  rateQN = '';  // Rate question number
  projectName = '';  // Project name
  success = false; // Creation checker

  // Database value holders
  questionsProject: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    // Current user ID
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Get current user id
        this.userID = user.uid;
        console.log(this.userID);
      }
    });
  }

  // Form creation with values
  ngOnInit() {
    this.QuestionsForm = this.fb.group({
      // Form elements
      textQuestion1: [],
      textQuestion2: [],
      textQuestion3: [],
      textQuestion4: [],
      textQuestion5: [],
      multiQuestion1: [],
      multiQuestion2: [],
      multiQuestion3: [],
      multiQuestion4: [],
      multiQuestion5: [],
      multiQuestion6: [],
      multiQuestion7: [],
      multiQuestion8: [],
      multiQuestion9: [],
      multiQuestion10: [],
      multiQuestion11: [],
      multiQuestion12: [],
      multiQuestion13: [],
      multiQuestion14: [],
      multiQuestion15: [],
      rateQuestion1: [],
      rateQuestion2: [],
      rateQuestion3: [],
      rateQuestion4: [],
      rateQuestion5: [],
      rateQuestion6: [],
      rateQuestion7: [],
      rateQuestion8: [],
      rateQuestion9: [],
      rateQuestion10: [],
      rateQuestion12: [],
      rateQuestion13: [],
      rateQuestion14: [],
      rateQuestion15: [],
      rateQuestion16: [],
      rateQuestion17: [],
      rateQuestion18: [],
      rateQuestion19: [],
      rateQuestion20: [],
      textNum: [],
      mutliNum: [],
      rateNum: [],
      projectName: [],
      isSend: Boolean(false)
    });
  }

  // Get the number of questions
  getNum(Tnum: string, Mnum: string, Rnum: string) {
    this.textQN = Tnum;
    this.multiQN = Mnum;
    this.rateQN = Rnum;
    this.success = true;
  }


  refresh(): void {
    setTimeout(location.reload.bind(location), 1500);
}

  async onSubmit(proName: string) {

    const formValue = this.QuestionsForm.value;

    // Sending form data to database
    try {
      await this.afs.collection('users').doc(this.userID).collection('questions').doc(proName).set(formValue);
      this.success = true;
      console.log('success');
    } catch (err) {
      console.error(err);
    }
    this.refresh();
  }
  // END OF CREATE-PROJECT COMPONENT.TS
}
