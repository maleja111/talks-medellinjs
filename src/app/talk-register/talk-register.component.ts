import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { SpeakerService } from '../shared/services/speaker.service';
import { TalkService } from '../shared/services/talk.service';
import { ITalk } from '../shared/talk';

import 'rxjs/add/operator/debounceTime';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

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

  talkForm: FormGroup;
  emailMessage: string;
  errorMessage: string;
  talk: ITalk[];
  filteredTals: ITalk[];

  get addresses(): FormArray {
    return <FormArray>this.talkForm.get('addresses');
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  };

  constructor(
    private fb: FormBuilder,
    private talkService: TalkService,
    private speakerService: SpeakerService
  ) { }

  ngOnInit(): void {
    this.talkForm = this.fb.group({
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
      necessaryResources: ['', [Validators.required]]
    });

    const emailControl = this.talkForm.get('emailGroup.email');
    emailControl.valueChanges.debounceTime(1000).subscribe(value =>
      this.setMessage(emailControl));
  }

  populateTestData(): void {
    this.talkForm.patchValue({
      firstName: 'Jack',
      lastName: 'white',
      titleTalk: 'Title Talk',
      twitterId: '@Harkness',
      emailGroup: { email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com' },
      duration: '1',
      shirtSize: 'S',
      talkDescription: 'Description of',
      speakerDescription: 'Developer',
      necessaryResources: 'IMac!!!',
    });
  }

  save(): void {
    console.log('Saved: ' + JSON.stringify(this.talkForm.value));
    this.saveSpeakers(this.talkForm.value);
  }

  saveSpeakers(data) {
    this.speakerService.saveSpeaker(this.jsonSpeaker(this.talkForm.value))
      .subscribe((result) => this.saveTalks(result._id), error => this.errorMessage = <any>error);
  }

  saveTalks(id: any) {
    this.talkService.saveTalk(this.jsonTalk(this.talkForm.value, id)).subscribe(
      () => { }, error => this.errorMessage = <any>error);
  }



  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }

  jsonSpeaker(data) {
    return {
      'name': `${data.firstName} ${data.lastName}`,
      'email': data.emailGroup.email,
      'twitterUser': data.twitterId,
      'description': data.speakerDescription,
      'size': data.shirtSize,
    };
  }

  jsonTalk(data, id) {
    return {
      'speakers': [{ '_id': id }],
      'title': data.titleTalk,
      'duration': data.duration,
      'description': data.talkDescription,
      'sources': data.necessaryResources
    };
  }

}
