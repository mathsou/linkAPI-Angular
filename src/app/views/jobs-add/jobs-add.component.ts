import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '../../interfaces/type';
import { User } from '../../interfaces/user';
import { JobService } from '../../services/job.service';
import { TypeService } from '../../services/type.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-jobs-add',
  templateUrl: './jobs-add.component.html',
  styleUrls: ['./jobs-add.component.scss']
})
export class JobsAddComponent implements OnInit {

  id: number;
  name: string;
  status: string[] = [];
  recurrenceValue: string;
  period: string;
  selectedType: Type;
  selectedUser: User;

  users: User[];
  types: Type[];

  loading = false;
  userVisible = true
  button = "Adicionar";
  validate = {
    name: true,
    email: true,
    password: true,
    repeatePassword: true,
    phone: true
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private typeService: TypeService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.typeService.getTypes().toPromise().then((type:any) => {
      this.types = type.data;
    });
    this.userService.getUsers().toPromise().then((type:any) => {
      this.users = type.data;
    });

    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    if (this.id > 0) {
      // this.loading = true;
      this.userVisible = false;
      this.button = "Atualizar";
      this.jobService.getOneJob(this.id)
        .toPromise()
        .then((job: any) => {
          console.log(job)
          this.name = job.data.name;
          this.status = job.data.status?['active']:[];
          this.recurrenceValue = job.data.recurrenceValue;
          this.period = job.data.recurrencePeriod;
          this.selectedType = job.data.recurrenceTypeId;
          this.selectedUser = job.data.userId;
        })
    }
  }

  setJob(){
    this.loading = true
    if(this.id>0)
      this.jobService.updateJob(this.id, {
        name: this.name,
        status: this.status[0] == 'active'?1:0,
        recurrenceTypeId: this.selectedType,
        recurrenceValue: this.recurrenceValue,
        recurrencePeriod: this.period
      }).toPromise().then(() => {
        console.log("Cadastrado com sucesso")
        this.loading = false;
        this.router.navigate(['/jobs'])
      })
    else
    this.jobService.setJobs({
      name: this.name,
      status: this.status[0] == 'active'?1:0,
      userId: this.selectedUser,
      recurrenceTypeId: this.selectedType,
      recurrenceValue: this.recurrenceValue,
      recurrencePeriod: this.period
    }).toPromise().then(() => {
      console.log("Cadastrado com sucesso")
      this.loading = false;
      this.router.navigate(['/jobs'])
    })
  }
}
