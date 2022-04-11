import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { User, Res } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<User[]>(`${API_URL}/users`);
  }

  getOneUser(id: number){
    return this.httpClient.get<User>(`${API_URL}/users/${id}`);
  }

  setUser(user: any) {
    return this.httpClient.post<Res>(`${API_URL}/users`, user)
  }

  updateUser(id: number, user: any) {
    return this.httpClient.put<Res>(`${API_URL}/users/${id}`, user)
  }

  deleteUser(id: number) {
    return this.httpClient.delete<Res>(`${API_URL}/users/${id}`)
  }
}
