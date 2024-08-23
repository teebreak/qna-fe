import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { QnaFormComponent } from './qna-form/qna-form.component';
import { QnaListComponent } from './qna-list/qna-list.component';
import { QnaService } from './qna.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QnaFormComponent, QnaListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  qnas: WritableSignal<any> = signal([]);
  selectedQna: WritableSignal<any> = signal(null);

  private qnaService: QnaService = inject(QnaService);

  ngOnInit(): void {
    this.fetchQnas();
  }

  onAddQna(qna: any): void {
    this.qnaService.addQna(qna.question, qna.answer).subscribe(() => {
      this.fetchQnas();
    });
  }

  onEditQna(qna: any): void {
    this.selectedQna.set(qna);
  }

  onUpdateQna(qna: any): void {
    this.qnaService
      .updateQna(qna._id, { question: qna.question, answer: qna.answer })
      .subscribe(() => {
        this.fetchQnas();
      });
  }

  onDeleteQna(qna: any): void {
    this.qnaService.deleteQna(qna._id).subscribe(() => {
      this.fetchQnas();
    });
  }

  private fetchQnas(): void {
    this.qnaService.getQnas().subscribe((qnas) => {
      this.qnas.set(qnas);
    });
  }
}
