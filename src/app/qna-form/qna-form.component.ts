import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QnaService } from '../qna.service';

@Component({
  selector: 'app-qna-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './qna-form.component.html',
  styleUrl: './qna-form.component.scss'
})
export class QnaFormComponent {
  @Output() qnaAdded: EventEmitter<void> = new EventEmitter()
  form: FormGroup;

  private qnaService: QnaService = inject(QnaService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { question, answer } = this.form.value;

      this.qnaService.addQna(question, answer).subscribe(() => {
        this.qnaAdded.emit();
      });

      this.form.reset();  // Reset the form after submission
    }
  }
}
