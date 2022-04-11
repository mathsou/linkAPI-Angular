import { Component, Injectable, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job';
import { Type } from 'src/app/interfaces/type';
import { JobService } from '../../services/job.service';
import { TypeService } from '../../services/type.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})

@Injectable()
export class JobsListComponent implements OnInit {

  jobs: Job[];
  types: Type[];
  cols: any[];

  typeNames:any = [];

  loading = true;

  constructor(
    private confirmationService: ConfirmationService,
    private jobService: JobService,
    private typeService: TypeService,
    private config: PrimeNGConfig,
    private message: MessageService
    ){

    }

  ngOnInit(): void {
    this.jobService.getJobs().toPromise().then((job:any) => {
      this.jobs = job.data
      this.loading = false;
    });

    this.typeService.getTypes().toPromise().then((type:any) => {
      this.types = type.data;
      this.typeNames = type.data.reduce((acc: any, val: any)=>{
        acc.push(val.name)
        return acc
      }, [])
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
        })
      }
  });
  }
  executeJob(name: string){
    this.confirmationService.confirm({
      message: 'Deseja executar esse Job?',
      header: 'Forçar execução',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        console.log("teste")
        this.message.add({ severity: 'success', summary: 'Execução', detail: 'Executado com sucesso' });
      }
  });
  }
}
