import { Component, OnInit } from '@angular/core';
// Firestore
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import {  AngularFireList  } from '@angular/fire/database';
// Form Builder
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

// Auth
import { AngularFireAuth } from '@angular/fire/auth';





export interface Item { questions: string; }

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})



export class ProjectsComponent implements OnInit {
  exampleForm: FormGroup;
  userForm: FormGroup;
  items: Observable<Item[]>;
  public userID: string;


  // Tester
  partLow: Array<any[]>;
  // End of Tester

// Second Tester
items2: Observable<any[]>;
itemsCollection3: AngularFirestoreCollection<any[]>;
items3: Observable<any[]>;
item4: Observable<any[]>;
tirt = [];
// End of Second Tester




  itemsCollection: AngularFirestoreCollection<Item>;
  // Alert booleans
  loading = false;
  success = false;

  textQN = '';
  multiQN = '';
  rateQN = '';
  projectName = '';
  testerName = 'test1';

  constructor(
    private fb: FormBuilder,
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth
     ) {
    // Current user ID
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        console.log(this.userID);
        // IMPORTANTA!!!!!! IMPORTANTA!!!!!!
        // tslint:disable-next-line:max-line-length
        this.item4 = this.afs.collection('users').doc(this.userID).collection('questions', ref => ref.where('projectName', '==', this.testerName )).valueChanges();
        // IMPORTANTA!!!!!! IMPORTANTA!!!!!!
      }
    });
    // Main  IMPORTANTA!!!!!!
    this.itemsCollection = afs.collection<Item>('tester');
    this.items = this.itemsCollection.valueChanges();
    // Main end  IMPORTANTA!!!!!!
    }



  // Form creation with values
  ngOnInit() {
    this.exampleForm = this.fb.group({
      // Form elements
      textQuestion1: [],
      textQuestion2: [],
      textQuestion3: [] ,
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
      projectName: []
    });
    this.userForm = this.fb.group({
      textAnswer1: [],
      textAnswer2: [],
      textAnswer3: [] ,
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


  getNum(Tnum: string, Mnum: string, Rnum: string) {
    this.textQN = Tnum;
    this.multiQN = Mnum;
    this.rateQN = Rnum;
    this.success = true;
  }





  async onSubmit(proName: string) {

    this.loading = true;
    const formValue = this.exampleForm.value;
    const formi = this.userForm.value;
    console.log(proName);

    // Sending form data to database
    try {
      await this.afs.collection('users').doc(this.userID).collection('questions').doc('proName').set(formValue);
     // await this.afs.collection('users').doc(this.userID).collection<Questions>('form').add(formValue);
      this.success = true;
      console.log('success');
    } catch (err) {
      console.error(err);
    }

    this.loading = false;
  }
}



