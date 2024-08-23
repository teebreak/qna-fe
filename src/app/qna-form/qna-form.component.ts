import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
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
export class QnaFormComponent implements OnChanges {
  @Input() qna: any | null = null;
  @Output() qnaAdded: EventEmitter<any> = new EventEmitter();
  @Output() qnaUpdated: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.qna) {
      this.isEditMode = true;
      this.form.patchValue({
        question: this.qna.question,
        answer: this.qna.answer,
      });
    } else {
      this.isEditMode = false;
      this.form.reset();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEditMode && this.qna) {
        this.qnaUpdated.emit({ ...this.form.value, _id: this.qna._id });
      } else {
        this.qnaAdded.emit(this.form.value);
      }
      this.form.reset();
      this.isEditMode = false;
    }
  }
}
