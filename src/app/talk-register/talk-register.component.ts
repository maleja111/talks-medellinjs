import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import { Talk } from './talk';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    };
    return null;
  };
}

@Component({
  selector: 'app-talk-register-component',
  templateUrl: './talk-register.component.html',
  styleUrls: ['./talk-register.component.css']
})
export class TalkRegisterComponent implements OnInit {

  customerForm: FormGroup;
  customer: Talk = new Talk();
  emailMessage: string;

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      twitterId: ['', [Validators.required]],
      titleTalk: ['', [Validators.required, Validators.minLength(3)]],
      duration: ['', [Validators.required]],
      shirtSize: ['', [Validators.required]],
      talkDescription: ['', [Validators.required, Validators.minLength(3)]],
      speakerDescription: ['', [Validators.required, Validators.minLength(3)]],
      necessaryResources: ''
    });

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.debounceTime(1000).subscribe(value =>
      this.setMessage(emailControl));
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      titleTalk: 'Title Talk',
      lastName: 'Harkness',
      emailGroup: { email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com' }
    });
  }

  save(): void {
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }

  setNotification(notifyVia: string): void {
    const twitterControl = this.customerForm.get('twitterId');
    if (notifyVia === 'text') {
      twitterControl.setValidators(Validators.required);
    } else {
      twitterControl.clearValidators();
    }
    twitterControl.updateValueAndValidity();
  }

}
