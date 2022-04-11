import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsAddComponent } from './views/jobs-add/jobs-add.component';
import { JobsListComponent } from './views/jobs-list/jobs-list.component';
import { UserAddComponent } from './views/user-add/user-add.component';
import { UsersListComponent } from './views/users-list/users-list.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'users/add/:id', component: UserAddComponent },
  { path: 'jobs', component: JobsListComponent },
  { path: 'jobs/add', component: JobsAddComponent },
  { path: 'jobs/add/:id', component: JobsAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
