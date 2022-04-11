import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { Type } from '../interfaces/type';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private httpClient: HttpClient) { }

  getTypes(){
    return this.httpClient.get<Type[]>(`${API_URL}/recurrenceType`);
  }
}
