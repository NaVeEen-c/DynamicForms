import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Dynamic-Form';
  forms: FormGroup[] = [];
  details: any;
  allForms = [
    {
      title: 'user Register',

      formProperties: [
        {
          type: 'text',
          name: 'name',
          value: '',
          placeholder: 'enter your name',
          Validators: [Validators.required],
          label: 'UserName',
          options: [],
        },
        {
          type: 'email',
          name: 'email',
          value: '',
          placeholder: 'enter your email',
          Validators: [Validators.required, Validators.email],
          label: 'Email',
          options: [],
        },
        {
          type: 'password',
          name: 'password',
          value: '',
          placeholder: 'enter your password',
          Validators: [Validators.required, Validators.minLength(8)],
          label: 'Password',
          options: [],
        },
        {
          type: 'select',
          name: 'organization',

          options: [
            { value: 'Quantela', name: 'Quantela' },
            { value: 'Paradiam', name: 'Paradiam' },
            { value: 'Cotiviti', name: 'Cotiviti' },
          ],
          Validators: [Validators.required],
          label: 'Organization',
        },
        {
          type: 'radio',
          name: 'gender',
          label: 'Select Gender',
          options: [
            { value: 'Male', name: 'Male' },
            { value: 'Female', name: 'Female' },
          ],
          Validators: [Validators.required],
        },
        {
          type: 'checkbox',
          name: 'languages',
          label: 'select Languages',
          options: [
            { value: 'Telugu', name: 'telugu' },
            { value: 'Hindi', name: 'hindi' },
            { value: 'English', name: 'english' },
          ],
          Validators: [Validators.required],
        },
        {
          type: 'textarea',
          name: 'feedbak',
          label: 'enter your feedback',
          value: '',
          placeholder: 'Enter Your Feedback',
          Validators: [Validators.required],
          options: [],
        },
      ],
    },
    {
      title: 'login',
      formProperties: [
        {
          type: 'text',
          name: 'username',
          value: '',
          placeholder: 'enter your name',
          Validators: [Validators.required],
          label: 'UserName',
          options: [],
        },
        {
          type: 'email',
          name: 'useremail',
          value: '',
          placeholder: 'enter your email',
          Validators: [Validators.required, Validators.email],
          label: 'Email',
          options: [],
        },
        {
          type: 'password',
          name: 'userpassword',
          value: '',
          placeholder: 'enter your password',
          Validators: [Validators.required, Validators.minLength(8)],
          label: 'Password',
          options: [],
        },
      ],
    },
  ];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    for (let form of this.allForms) {
      const formGroup = this.fb.group({});
      for (let element of form.formProperties) {
        if (element.type === 'checkbox') {
          const fbarray = this.fb.array(
            element.options.map((options) => this.fb.control(false))
          );
          console.log(fbarray);
          formGroup.addControl(element.name, fbarray);
        } else {
          formGroup.addControl(
            element.name,
            this.fb.control(element.value, element.Validators)
          );
        }
      }
      this.forms.push(formGroup);
    }
  }
  handleForm(index: number) {
    this.details = this.forms[index].value;
    console.log(this.details);
    // const patch:any={}
    // for(let element of this.formProperties){
    //   patch[element.name]=''

    //   }
    //   this.form.patchValue(patch)
  }
}
