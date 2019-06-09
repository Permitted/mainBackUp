import { Component, OnInit } from '@angular/core';
// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
// Form Builder
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {



  constructor(private fb: FormBuilder, public db: AngularFirestore) { }

  ngOnInit() {
  }


}
