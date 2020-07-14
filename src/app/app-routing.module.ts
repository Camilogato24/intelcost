import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'detailImages/:id',
    loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule)
    
  },
  { 
    path: 'listImages', 
    loadChildren: () => import('./components/list/list.module').then(m => m.ListModule) 
  },
  {
    path: '**',
    redirectTo: 'listImages'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
