import { Component } from '@angular/core';
import { QnaFormComponent } from './qna-form/qna-form.component';
import { QnaListComponent } from './qna-list/qna-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QnaFormComponent, QnaListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  onQnaAdded(): void {
    // refresh the list
  }
}
