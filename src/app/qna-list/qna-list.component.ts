import { Component, computed, input, InputSignal, Signal } from '@angular/core';

@Component({
  selector: 'app-qna-list',
  standalone: true,
  imports: [],
  templateUrl: './qna-list.component.html',
  styleUrl: './qna-list.component.scss',
})
export class QnaListComponent {
  qnas: InputSignal<any> = input.required<any>();

  questions: Signal<any> = computed(() =>
    this.qnas().map((entry: any) => ({ ...entry, showAnswer: false })),
  );

  toggleAnswer(index: number) {
    this.questions()[index].showAnswer = !this.questions()[index].showAnswer;
  }
}
