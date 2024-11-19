// frontend/src/app/test-connection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestConnectionService {
  private apiUrl = 'https://localhost:7190/api/test/test-connection';

  constructor(private http: HttpClient) { }

  testConnection(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
