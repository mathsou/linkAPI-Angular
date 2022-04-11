import { Component, Injectable, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job';
import { JobService } from '../../services/job.service';
import {ConfirmationService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})

@Injectable()
export class JobsListComponent implements OnInit {

  jobs: Job[];
  cols: any[];

  loading = true;

  constructor(
    private confirmationService: ConfirmationService,
    private jobService: JobService,
    private config: PrimeNGConfig
    ){

    }

  ngOnInit(): void {
    this.jobService.getJobs().toPromise().then((job:any) => {
      console.log(job)
      this.jobs = job.data
      this.loading = false;
    });
  }

  deleteJob(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o usuário?',
      header: 'Excluir usuário',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.loading = true;
        this.jobService.deleteJob(id).toPromise().then((response) => {
          this.jobs = this.jobs.filter((job)=>{
            return job.id != id;
          })
          this.loading = false;
          console.log(response);
        })
      }
  });
  }
}
