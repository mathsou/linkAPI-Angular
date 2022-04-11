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
    phone: true,
    equalPasswords: true
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
    if(!this.name) this.validate.name = false;
    else this.validate.name = true;
    if(!this.email) this.validate.email = false;
    else this.validate.email = true;
    if(!this.password) this.validate.password = false;
    else this.validate.password = true;
    if(!this.repeatePassword) this.validate.repeatePassword = false;
    else this.validate.repeatePassword = true;
    if(!this.phone) this.validate.phone = false;
    else this.validate.phone = true;
    if(this.id > 0){
      this.validate.password = true;
      this.validate.repeatePassword = true;
      if(this.password != this.repeatePassword){
        this.validate.equalPasswords = false
      }else{
        this.validate.equalPasswords = true
      }
    }else{
      if(this.password != this.repeatePassword){
        this.validate.equalPasswords = false
      }else{
        this.validate.equalPasswords = true
      }
    }
    if(this.validate.name && this.validate.email && this.validate.phone && this.validate.password && this.validate.repeatePassword && this.validate.equalPasswords){
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
        }).catch((res)=>{
          console.log(res)
          this.message.add({ severity: 'error', summary: 'Erro', detail: res.message });
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
    }else{
      if(!this.validate.name && !this.validate.email && !this.validate.phone && !this.validate.password && !this.validate.repeatePassword){
        this.message.add({ severity: 'error', summary: 'Erro', detail: 'Preencha os campos restantes' });
      }
      if(!this.validate.equalPasswords){
        this.message.add({ severity: 'error', summary: 'Erro', detail: 'Senhas diferentes' });
      }
    }
  }

  changePassword() {
    this.showPassword = !this.showPassword;
  }

}
