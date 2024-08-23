import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QnaService {
  private apiUrl = 'http://localhost:3000/qna';

  private http: HttpClient = inject(HttpClient);

  getQnas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addQna(question: string, answer: string): Observable<any> {
    const newQna = { question, answer };
    return this.http.post<any>(this.apiUrl, newQna);
  }

  updateQna(id: string, updatedQna: { question?: string, answer?: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, updatedQna);
  }

  setEditing(id: string, isEditing: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, {isEditing});
  }

  deleteQna(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
