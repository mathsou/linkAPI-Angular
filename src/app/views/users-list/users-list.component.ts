import { Component, Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from '../../services/user.service';
import {ConfirmationService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

@Injectable()
export class UsersListComponent implements OnInit {

  users: User[];
  cols: any[];

  visible = true;


  constructor(
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private config: PrimeNGConfig
    ){

    }

  ngOnInit(): void {
    this.userService.getUsers().toPromise().then((user:any) => {
      this.users = user.data
      this.visible = false;
    });

  //   this.config.filterMatchModeOptions = {
  //     text: [
  //         "Começa com",
  //         "Contém",
  //         "Não contém",
  //         "Termina com",
  //         FilterMatchMode.EQUALS,
  //         FilterMatchMode.NOT_EQUALS
  //     ],
  //     numeric: [
  //         FilterMatchMode.EQUALS,
  //         FilterMatchMode.NOT_EQUALS,
  //         FilterMatchMode.LESS_THAN,
  //         FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
  //         FilterMatchMode.GREATER_THAN,
  //         FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
  //     ],
  //     date: [
  //         FilterMatchMode.DATE_IS,
  //         FilterMatchMode.DATE_IS_NOT,
  //         FilterMatchMode.DATE_BEFORE,
  //         FilterMatchMode.DATE_AFTER
  //     ]
  // }
  }
  test(event: any){
    console.log(event);
    filter(event)
  }
  deleteUser(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o usuário?',
      header: 'Excluir usuário',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.visible = true;
        this.userService.deleteUser(id).toPromise().then((response) => {
          this.users = this.users.filter((user)=>{
            return user.id != id;
          })
          this.visible = false;
          console.log(response);
        })
      }
  });
  }
}
