import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=893af480';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}&s=${query}`);
  }
}
