import { Component, inject, OnInit } from '@angular/core';
import { QnaService } from '../qna.service';

@Component({
  selector: 'app-qna-list',
  standalone: true,
  imports: [],
  templateUrl: './qna-list.component.html',
  styleUrl: './qna-list.component.scss'
})
export class QnaListComponent implements OnInit {
  questions: { question: string, answer: string, showAnswer: boolean }[] = [];

  private qnaService: QnaService = inject(QnaService);

  ngOnInit(): void {
    this.qnaService.getQnas().subscribe((qnas) => {
      this.questions = qnas;
    })
  }

  toggleAnswer(index: number) {
    this.questions[index].showAnswer = !this.questions[index].showAnswer;
  }
}
