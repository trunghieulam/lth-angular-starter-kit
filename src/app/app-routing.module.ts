import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
