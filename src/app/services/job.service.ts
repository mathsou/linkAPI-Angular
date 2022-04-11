import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { Job, Res } from '../interfaces/job';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient: HttpClient) { }

  getJobs(){
    return this.httpClient.get<Job[]>(`${API_URL}/jobs`);
  }

  setJobs(job: any){
    return this.httpClient.post<Res>(`${API_URL}/jobs`, job)
  }

  getOneJob(id: number){
    return this.httpClient.get<Job[]>(`${API_URL}/jobs/${id}`);
  }

  updateJob(id: number, job: any) {
    return this.httpClient.put<Res>(`${API_URL}/jobs/${id}`, job)
  }

  deleteJob(id: number){
    return this.httpClient.delete<Res>(`${API_URL}/jobs/${id}`);
  }
}
