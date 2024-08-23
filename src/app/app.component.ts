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

  private qnaService: QnaService = inject(QnaService);

  ngOnInit(): void {
    this.fetchQnas();
  }

  onAddQna(qna: any): void {
    this.qnaService.addQna(qna.question, qna.answer).subscribe(() => {
      this.fetchQnas();
    });
  }

  private fetchQnas(): void {
    this.qnaService.getQnas().subscribe((qnas) => {
      this.qnas.set(qnas);
    });
  }
}
