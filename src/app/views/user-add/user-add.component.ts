import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api'
import Helper from "../../utils/helper"


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  id: number;
  name: string;
  email: string;
  password: string;
  repeatePassword: string;
  phone: string;

  validate = {
    name: true,
    email: true,
    password: true,
    repeatePassword: true,
    phone: true
  }

  button = "Adicionar";
  visible = false;
  showPassword = true;


  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private helper: Helper,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    if (this.id > 0) {
      this.visible = true;
      this.button = "Atualizar";
      this.showPassword = false;
      this.userService.getOneUser(this.id)
        .toPromise()
        .then((user: any) => {
          this.name = user.data.name;
          this.email = user.data.email;
          this.phone = this.helper.maskFormat(user.data.phone, "(##) #####-####");
          this.visible = false;
        })
    }
  }

  setUser() {
    if (!this.name || !this.email || !this.phone || !this.password || !this.repeatePassword) {
      this.message.add({ severity: 'error', summary: 'Erro', detail: 'Preencha os campos restantes' });
      this.validate = {
        name: this.name ? true : false,
        email: this.email ? true : false,
        phone: this.phone ? true : false,
        password: this.password ? true : false,
        repeatePassword: this.repeatePassword ? true : false
      }
    }
    if(this.id > 0){
      if(this.password || this.repeatePassword){
        if(this.password != this.repeatePassword ) {
          this.message.add({ severity: 'error', summary: 'Erro', detail: 'Senhas diferentes' });
          this.validate.password = false;
          this.validate.repeatePassword = false;
          return;
        }else{
          this.validate.password = true;
          this.validate.repeatePassword = true;
        }
      }else{
        this.validate.password = true;
        this.validate.repeatePassword = true;
      }
    }else{
      if(this.password != this.repeatePassword ) {
        this.message.add({ severity: 'error', summary: 'Erro', detail: 'Senhas diferentes' });
        this.validate.password = false;
        this.validate.repeatePassword = false;
      }
    }

    if(this.validate.name && this.validate.email && this.validate.phone && this.validate.password && this.validate.repeatePassword)
      if (this.id > 0) {
        if (this.password)
          if (this.password != this.repeatePassword) {
            console.log("senhas diferentes")
            return;
          }
        this.visible = true;
        this.userService.updateUser(this.id, {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone.replace(/[^0-9]/g, "")
        }).toPromise().then(() => {
          this.router.navigate(['/users'])
        })
      }
      else
        this.userService.setUser({
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone.replace(/[^0-9]/g, "")
        }).toPromise().then(() => {
          this.router.navigate(['/users'])
        })
  }

  changePassword() {
    this.showPassword = !this.showPassword;
  }

}
