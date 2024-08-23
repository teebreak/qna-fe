import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-qna-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './qna-form.component.html',
  styleUrl: './qna-form.component.scss',
})
export class QnaFormComponent {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
      this.form.reset();
    }
  }
}
